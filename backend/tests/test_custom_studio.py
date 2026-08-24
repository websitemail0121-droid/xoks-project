"""Custom Studio backend tests: products sections, photo uploads, checkout with custom items."""
import io
import os

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
BASE_URL = base_url.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    return s


def png_bytes(size=(40, 40), color=(200, 30, 30)):
    from PIL import Image
    buf = io.BytesIO()
    Image.new("RGB", size, color).save(buf, format="PNG")
    return buf.getvalue()


def jpg_bytes(size=(40, 40)):
    from PIL import Image
    buf = io.BytesIO()
    Image.new("RGB", size, (10, 120, 200)).save(buf, format="JPEG")
    return buf.getvalue()


SHIPPING = {
    "full_name": "TEST_ Cliente",
    "email": "test_custom@example.com",
    "phone": "912345678",
    "address": "Rua de Teste 1",
    "city": "Braga",
    "postal_code": "4700-000",
    "country": "Portugal",
}
BILLING = {"same_as_shipping": True}


# ---------- Products / sections ----------
class TestProducts:
    def test_products_list_has_custom_studio(self, client):
        r = client.get(f"{API}/products")
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 7, f"expected 7 products, got {len(data)}"
        by_id = {p["id"]: p for p in data}
        assert "studio-base" in by_id and "studio-pro" in by_id
        for pid, price in (("studio-base", 92.90), ("studio-pro", 99.90)):
            p = by_id[pid]
            assert p["section"] == "custom"
            assert p["product_type"] == "custom"
            assert p["price"] == pytest.approx(price)
            assert p["sizes"], "custom product must expose sizes"
            assert "_id" not in p

    def test_sections_present(self, client):
        data = client.get(f"{API}/products").json()
        sections = {p["section"] for p in data}
        assert {"collection", "carbon", "custom"} <= sections

    def test_get_single_custom_product(self, client):
        r = client.get(f"{API}/products/studio-pro")
        assert r.status_code == 200
        p = r.json()
        assert p["name"] == "Studio Pro"
        assert p["product_type"] == "custom"


# ---------- Uploads ----------
class TestUploads:
    uploaded = []

    def test_upload_png(self, client):
        data = png_bytes()
        r = client.post(f"{API}/uploads/custom-photo",
                        files={"file": ("TEST_left.png", data, "image/png")})
        assert r.status_code == 200, r.text[:400]
        body = r.json()
        assert set(["id", "url", "content_type", "size"]) <= set(body)
        assert body["content_type"] == "image/png"
        assert body["url"] == f"/api/uploads/file/{body['id']}"
        assert body["size"] == len(data)
        TestUploads.uploaded.append(body["id"])

    def test_upload_jpg_and_download(self, client):
        data = jpg_bytes()
        r = client.post(f"{API}/uploads/custom-photo",
                        files={"file": ("TEST_right.jpg", data, "image/jpeg")})
        assert r.status_code == 200, r.text[:400]
        fid = r.json()["id"]
        TestUploads.uploaded.append(fid)
        g = client.get(f"{API}/uploads/file/{fid}")
        assert g.status_code == 200
        assert g.headers["content-type"].startswith("image/jpeg")
        assert g.content == data

    def test_upload_rejects_non_image(self, client):
        r = client.post(f"{API}/uploads/custom-photo",
                        files={"file": ("TEST_bad.txt", b"hello world", "text/plain")})
        assert r.status_code == 400, r.text[:300]
        assert "detail" in r.json()

    def test_download_unknown_id_404(self, client):
        r = client.get(f"{API}/uploads/file/does-not-exist-123")
        assert r.status_code == 404


# ---------- Checkout with custom items ----------
def _checkout(client, tier_id, carbon, custom_extra=None):
    custom_data = {
        "tier": "pro" if tier_id == "studio-pro" else "base",
        "carbon": carbon,
        "player_name": "TEST PLAYER",
        "player_number": "10",
        "notes": "TEST_ observations",
        "photo_left": "/api/uploads/file/left-id",
        "photo_right": "/api/uploads/file/right-id",
        "photo_extras": [],
    }
    if custom_extra:
        custom_data.update(custom_extra)
    payload = {
        "items": [{
            "product_id": tier_id,
            "name": "whatever",
            "size": "M",
            "price": 1.0,  # deliberately wrong; server must recompute
            "quantity": 1,
            "custom_data": custom_data,
        }],
        "shipping": SHIPPING,
        "billing": BILLING,
        "notes": "TEST_ order",
        "origin_url": BASE_URL,
    }
    return client.post(f"{API}/checkout", json=payload)


class TestCustomCheckout:
    @pytest.mark.parametrize("tier,carbon,expected", [
        ("studio-pro", "fusion", 109.90),
        ("studio-base", "plain", 92.90),
        ("studio-base", "twill", 97.90),
    ])
    def test_checkout_price_recompute(self, client, tier, carbon, expected):
        r = _checkout(client, tier, carbon)
        assert r.status_code == 200, r.text[:500]
        body = r.json()
        assert body["checkout_url"].startswith("https://")
        assert body["session_id"].startswith("cs_")
        order_number = body["order_number"]

        o = client.get(f"{API}/orders/{order_number}")
        assert o.status_code == 200
        order = o.json()
        assert order["status"] == "pending_payment"
        assert order["subtotal"] == pytest.approx(expected)
        # free shipping over 60 EUR
        assert order["shipping_cost"] == pytest.approx(0.0)
        assert order["total"] == pytest.approx(expected)
        item = order["items"][0]
        assert item["price"] == pytest.approx(expected)
        cd = item["custom_data"]
        assert cd is not None, "custom_data not persisted on order item"
        for k in ("tier", "carbon", "player_name", "player_number", "notes",
                  "photo_left", "photo_right", "photo_extras"):
            assert k in cd, f"missing custom_data key {k}"
        assert cd["carbon"] == carbon
        assert cd["player_name"] == "TEST PLAYER"

    def test_checkout_unknown_carbon_falls_back_to_base(self, client):
        r = _checkout(client, "studio-pro", "unicorn")
        assert r.status_code == 200, r.text[:400]
        order = client.get(f"{API}/orders/{r.json()['order_number']}").json()
        assert order["subtotal"] == pytest.approx(99.90)

    def test_checkout_invalid_product(self, client):
        payload = {
            "items": [{"product_id": "nope", "name": "x", "price": 10, "quantity": 1}],
            "shipping": SHIPPING, "billing": BILLING, "origin_url": BASE_URL,
        }
        r = client.post(f"{API}/checkout", json=payload)
        assert r.status_code == 400

    def test_checkout_empty_cart(self, client):
        payload = {"items": [], "shipping": SHIPPING, "billing": BILLING, "origin_url": BASE_URL}
        r = client.post(f"{API}/checkout", json=payload)
        assert r.status_code == 400

    def test_standard_item_has_no_custom_data(self, client):
        payload = {
            "items": [{"product_id": "xoks-game", "name": "x", "size": "M", "price": 1,
                       "quantity": 1, "custom_data": {"carbon": "fusion"}}],
            "shipping": SHIPPING, "billing": BILLING, "origin_url": BASE_URL,
        }
        r = client.post(f"{API}/checkout", json=payload)
        assert r.status_code == 200, r.text[:400]
        order = client.get(f"{API}/orders/{r.json()['order_number']}").json()
        assert order["items"][0]["custom_data"] is None
        assert order["subtotal"] == pytest.approx(49.90)
        assert order["shipping_cost"] == pytest.approx(4.99)
