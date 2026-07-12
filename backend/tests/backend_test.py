import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://xoks-shin-guards.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Products
def test_get_products(session):
    r = session.get(f"{API}/products")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list) and len(data) >= 1
    p = data[0]
    assert p["id"] == "xoks-pro-elite"
    assert "Caneleiras XOK'S Pro Elite" in p["name"]
    assert p["image"].startswith("http")
    assert set(p["sizes"]) == {"S", "M", "L", "XL"}
    assert len(p["specs"]) >= 3


def test_get_product_by_id(session):
    r = session.get(f"{API}/products/xoks-pro-elite")
    assert r.status_code == 200
    assert r.json()["id"] == "xoks-pro-elite"


def test_get_product_invalid(session):
    r = session.get(f"{API}/products/nonexistent-xyz")
    assert r.status_code == 404


# Orders
@pytest.fixture(scope="module")
def sample_payload():
    return {
        "items": [{
            "product_id": "xoks-pro-elite",
            "name": "Caneleiras XOK'S Pro Elite",
            "size": "M",
            "price": 49.99,
            "quantity": 2,
            "image": "https://example.com/x.png",
        }],
        "shipping": {
            "full_name": "TEST User",
            "email": "test_xoks@example.com",
            "phone": "+351912345678",
            "address": "Rua Teste 1",
            "city": "Lisboa",
            "postal_code": "1000-001",
            "country": "Portugal",
        },
        "billing": {"same_as_shipping": True},
        "subtotal": 99.98,
        "shipping_cost": 0.0,
        "total": 99.98,
        "notes": "TEST order",
    }


created_order_number = {"val": None}


def test_create_order(session, sample_payload):
    r = session.post(f"{API}/orders", json=sample_payload)
    assert r.status_code == 200, r.text
    o = r.json()
    assert o["order_number"].startswith("XOKS-")
    assert o["status"] == "pending"
    assert o["total"] == 99.98
    assert len(o["items"]) == 1
    assert o["shipping"]["email"] == "test_xoks@example.com"
    created_order_number["val"] = o["order_number"]


def test_create_order_empty_items(session, sample_payload):
    payload = dict(sample_payload)
    payload["items"] = []
    r = session.post(f"{API}/orders", json=payload)
    assert r.status_code == 400


def test_list_orders_sorted(session):
    r = session.get(f"{API}/orders")
    assert r.status_code == 200
    orders = r.json()
    assert isinstance(orders, list) and len(orders) >= 1
    if len(orders) >= 2:
        assert orders[0]["created_at"] >= orders[1]["created_at"]


def test_get_order_by_number(session):
    on = created_order_number["val"]
    assert on
    r = session.get(f"{API}/orders/{on}")
    assert r.status_code == 200
    assert r.json()["order_number"] == on


def test_get_order_invalid(session):
    r = session.get(f"{API}/orders/XOKS-000000")
    assert r.status_code == 404


def test_patch_order_status(session):
    on = created_order_number["val"]
    r = session.patch(f"{API}/orders/{on}", json={"status": "shipped"})
    assert r.status_code == 200
    assert r.json()["status"] == "shipped"
    # verify persistence
    r2 = session.get(f"{API}/orders/{on}")
    assert r2.json()["status"] == "shipped"
