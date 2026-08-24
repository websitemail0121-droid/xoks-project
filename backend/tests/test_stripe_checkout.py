"""Stripe checkout integration tests — /api/checkout, /api/payments/status, regression."""
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
    s.headers.update({"Content-Type": "application/json"})
    return s


def shipping(name="TEST_QA Cliente"):
    return {
        "full_name": name,
        "email": "qa.teste@example.com",
        "phone": "+351912345678",
        "address": "Rua de Teste 123",
        "city": "Lisboa",
        "postal_code": "1000-001",
        "country": "Portugal",
    }


def payload(items, notes="TEST_ order"):
    return {
        "items": items,
        "shipping": shipping(),
        "billing": {"same_as_shipping": True},
        "notes": notes,
        "origin_url": BASE_URL,
    }


# ---------- Regression: products / athletes ----------
class TestRegression:
    def test_products(self, client):
        r = client.get(f"{API}/products")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list) and len(data) >= 4
        ids = {p["id"] for p in data}
        assert {"xoks-game", "xoks-carbon-plain", "xoks-carbon-twill", "xoks-carbon-fusion"} <= ids
        assert all("_id" not in p for p in data)

    def test_athletes(self, client):
        r = client.get(f"{API}/athletes")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
        assert all("_id" not in a for a in r.json())

    def test_orders_list(self, client):
        r = client.get(f"{API}/orders")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Checkout creation ----------
class TestCheckout:
    def test_invalid_product_returns_400(self, client):
        r = client.post(f"{API}/checkout", json=payload([
            {"product_id": "nao-existe", "name": "Fake", "price": 1.0, "quantity": 1}
        ]))
        assert r.status_code == 400, r.text
        assert "inv" in r.json().get("detail", "").lower()

    def test_empty_cart_returns_400(self, client):
        r = client.post(f"{API}/checkout", json=payload([]))
        assert r.status_code == 400, r.text

    def test_checkout_paid_shipping_under_threshold(self, client):
        """xoks-game 49.90 => subtotal 49.90 < 60 => shipping 4.99, total 54.89"""
        r = client.post(f"{API}/checkout", json=payload([
            {"product_id": "xoks-game", "name": "X", "price": 1.0, "quantity": 1, "size": "M"}
        ]))
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["checkout_url"].startswith("https://checkout.stripe.com")
        assert d["session_id"].startswith("cs_")
        assert d["order_number"].startswith("XOKS-")

        order = client.get(f"{API}/orders/{d['order_number']}")
        assert order.status_code == 200
        o = order.json()
        assert o["status"] == "pending_payment"
        assert o["subtotal"] == 49.90
        assert o["shipping_cost"] == 4.99
        assert o["total"] == 54.89
        # server-side price recalculation ignores client-sent price
        assert o["items"][0]["price"] == 49.90
        assert o["items"][0]["size"] == "M"

        st = client.get(f"{API}/payments/status/{d['session_id']}")
        assert st.status_code == 200, st.text
        s = st.json()
        assert s["session_id"] == d["session_id"]
        assert s["payment_status"] == "pending"
        assert s["order_number"] == d["order_number"]
        assert "_id" not in s

    def test_checkout_free_shipping_over_threshold(self, client):
        """2 x xoks-game = 99.80 >= 60 => free shipping"""
        r = client.post(f"{API}/checkout", json=payload([
            {"product_id": "xoks-game", "name": "X", "price": 999.0, "quantity": 2}
        ]))
        assert r.status_code == 200, r.text
        d = r.json()
        o = client.get(f"{API}/orders/{d['order_number']}").json()
        assert o["subtotal"] == 99.80
        assert o["shipping_cost"] == 0.0
        assert o["total"] == 99.80

    def test_quantity_tampering_is_normalised(self, client):
        r = client.post(f"{API}/checkout", json=payload([
            {"product_id": "xoks-carbon-plain", "name": "X", "price": 0.01, "quantity": 0}
        ]))
        assert r.status_code == 200, r.text
        o = client.get(f"{API}/orders/{r.json()['order_number']}").json()
        assert o["items"][0]["quantity"] == 1
        assert o["subtotal"] == 44.90

    def test_status_unknown_session_404(self, client):
        r = client.get(f"{API}/payments/status/cs_test_doesnotexist_123")
        assert r.status_code == 404


# ---------- Webhook ----------
class TestWebhook:
    def test_webhook_rejects_bad_signature(self, client):
        r = requests.post(f"{API}/stripe/webhook", data=b'{"type":"checkout.session.completed"}',
                          headers={"stripe-signature": "t=1,v1=bad"})
        assert r.status_code == 400


# ---------- Order status transitions used by admin ----------
class TestOrderAdmin:
    def test_patch_order_status(self, client):
        r = client.post(f"{API}/checkout", json=payload([
            {"product_id": "xoks-carbon-twill", "name": "X", "price": 1.0, "quantity": 1}
        ]))
        num = r.json()["order_number"]
        p = client.patch(f"{API}/orders/{num}", json={"status": "paid"})
        assert p.status_code == 200, p.text
        assert p.json()["status"] == "paid"
        assert client.get(f"{API}/orders/{num}").json()["status"] == "paid"

    def test_patch_unknown_order_404(self, client):
        assert client.patch(f"{API}/orders/XOKS-000000", json={"status": "paid"}).status_code == 404
