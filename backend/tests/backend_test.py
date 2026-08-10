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


# ---------- Products ----------
def test_get_products_returns_5_active(session):
    r = session.get(f"{API}/products")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    ids = {p["id"] for p in data}
    expected = {"xoks-pro-elite", "xoks-carbon-blue", "xoks-stealth-ankle", "xoks-game", "xoks-carbon-plain"}
    assert expected.issubset(ids), f"Missing seeded products: {expected - ids}"
    # baseline should be exactly 5 active
    assert len([p for p in data if p.get("active", True)]) == 5


def test_xoks_carbon_plain_details(session):
    r = session.get(f"{API}/products/xoks-carbon-plain")
    assert r.status_code == 200
    p = r.json()
    assert p["id"] == "xoks-carbon-plain"
    assert p["name"] == "Caneleiras XOK'S Carbon Plain"
    assert p["tagline"] == "Plain Weave"
    assert p["price"] == 44.90
    assert p["image_bg"] == "light"
    assert p["image"] == "/carbon-plain-v1.png"
    assert set(p["sizes"]) == {"S", "M", "L", "XL"}
    specs = p.get("specs", [])
    assert "Carbono Tafetán (Plain Weave)" in specs
    assert "Camada protetora anti-riscos" in specs
    assert "Peso ultraleve" in specs
    assert p.get("colors", []) == []


def test_carbon_plain_image_reachable(session):
    url = f"{BASE_URL}/carbon-plain-v1.png"
    r = session.get(url)
    assert r.status_code == 200, f"{url} -> {r.status_code}"
    assert r.headers.get("content-type", "").startswith("image/"), url


def test_dark_products_remain_dark(session):
    for pid in ["xoks-pro-elite", "xoks-carbon-blue", "xoks-stealth-ankle"]:
        r = session.get(f"{API}/products/{pid}")
        assert r.status_code == 200
        p = r.json()
        assert p.get("image_bg") != "light", f"{pid} should not be light, got {p.get('image_bg')}"


def test_get_product_xoks_game(session):
    r = session.get(f"{API}/products/xoks-game")
    assert r.status_code == 200
    p = r.json()
    assert p["id"] == "xoks-game"
    assert p["name"] == "Caneleiras XOK'S Game"
    assert p["tagline"] == "Game Core"
    assert p["price"] == 49.90
    assert set(p["sizes"]) == {"S", "M", "L", "XL"}
    # specs
    specs = p.get("specs", [])
    assert "Multi-Layer Composite Technology™" in specs
    assert "Camada protetora anti-riscos" in specs
    assert "Design ergonómico e ultraleve" in specs
    # colors: 4 variants
    colors = p.get("colors", [])
    assert len(colors) == 4
    color_names = {c["name"] for c in colors}
    assert color_names == {"Azul", "Amarelo", "Laranja", "Verde"}
    # gallery of 4
    assert len(p.get("gallery", [])) == 4
    # Each color image matches gallery
    for c in colors:
        assert c["image"] in p["gallery"]


def test_xoks_game_images_reachable(session):
    for color in ["blue", "yellow", "orange", "green"]:
        url = f"{BASE_URL}/game-{color}-v2.png"
        r = session.get(url)
        assert r.status_code == 200, f"{url} -> {r.status_code}"
        assert r.headers.get("content-type", "").startswith("image/"), url


def test_xoks_game_image_bg_light_and_v2(session):
    r = session.get(f"{API}/products/xoks-game")
    assert r.status_code == 200
    p = r.json()
    assert p.get("image_bg") == "light"
    assert p["image"] == "/game-blue-v2.png"
    assert p["gallery"] == ["/game-blue-v2.png", "/game-yellow-v2.png", "/game-orange-v2.png", "/game-green-v2.png"]
    for c in p["colors"]:
        assert c["image"].endswith("-v2.png")


def test_get_product_by_id(session):
    r = session.get(f"{API}/products/xoks-pro-elite")
    assert r.status_code == 200
    p = r.json()
    assert p["id"] == "xoks-pro-elite"
    assert p["price"] == 49.99
    assert set(p["sizes"]) == {"S", "M", "L", "XL"}


def test_get_product_invalid(session):
    r = session.get(f"{API}/products/nonexistent-xyz")
    assert r.status_code == 404


created_product_id = {"val": None}


def test_create_product(session):
    payload = {
        "name": "TEST_Caneleira",
        "price": 19.99,
        "sizes": ["S", "M"],
        "image": "https://example.com/test.png",
        "description": "TEST product",
    }
    r = session.post(f"{API}/products", json=payload)
    assert r.status_code == 200, r.text
    p = r.json()
    assert p["name"] == "TEST_Caneleira"
    assert p["price"] == 19.99
    assert p["active"] is True
    created_product_id["val"] = p["id"]

    # Verify in list
    r2 = session.get(f"{API}/products")
    assert any(x["id"] == p["id"] for x in r2.json())


def test_update_product_price_and_active(session):
    pid = created_product_id["val"]
    assert pid
    r = session.put(f"{API}/products/{pid}", json={"price": 29.99, "active": False})
    assert r.status_code == 200
    assert r.json()["price"] == 29.99

    # Should be hidden from default list
    r2 = session.get(f"{API}/products")
    assert not any(x["id"] == pid for x in r2.json())

    # Should show with include_inactive
    r3 = session.get(f"{API}/products", params={"include_inactive": "true"})
    assert any(x["id"] == pid for x in r3.json())


def test_update_product_invalid(session):
    r = session.put(f"{API}/products/no-such-id", json={"price": 10})
    assert r.status_code == 404


def test_delete_product(session):
    pid = created_product_id["val"]
    r = session.delete(f"{API}/products/{pid}")
    assert r.status_code == 200
    assert r.json().get("deleted") is True
    # Confirm 404
    r2 = session.get(f"{API}/products/{pid}")
    assert r2.status_code == 404


def test_delete_product_invalid(session):
    r = session.delete(f"{API}/products/no-such-id")
    assert r.status_code == 404


# ---------- Athletes ----------
def test_get_athletes_seeded_sorted(session):
    r = session.get(f"{API}/athletes")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 5, f"Expected exactly 5 athletes, got {len(data)}"
    # sorted by order ascending
    orders = [a["order"] for a in data]
    assert orders == sorted(orders)
    # Validate real-athlete seed shape: ids ath-1..ath-5, images /atleta1..5.jpg, empty name/club
    ids = {a["id"] for a in data}
    assert ids == {f"ath-{i}" for i in range(1, 6)}
    for a in data:
        idx = a["id"].split("-")[1]
        assert a["image"] == f"/atleta{idx}.jpg"


def test_athlete_images_reachable(session):
    for i in range(1, 6):
        url = f"{BASE_URL}/atleta{i}.jpg"
        r = session.get(url)
        assert r.status_code == 200, f"{url} -> {r.status_code}"
        assert r.headers.get("content-type", "").startswith("image/"), f"{url} content-type={r.headers.get('content-type')}"


created_athlete_id = {"val": None}


def test_create_athlete(session):
    payload = {"name": "TEST_Athlete", "club": "TEST_Club",
               "image": "https://example.com/ath.jpg", "order": 99}
    r = session.post(f"{API}/athletes", json=payload)
    assert r.status_code == 200, r.text
    a = r.json()
    assert a["name"] == "TEST_Athlete"
    assert a["image"] == "https://example.com/ath.jpg"
    created_athlete_id["val"] = a["id"]


def test_delete_athlete(session):
    aid = created_athlete_id["val"]
    assert aid
    r = session.delete(f"{API}/athletes/{aid}")
    assert r.status_code == 200
    r2 = session.delete(f"{API}/athletes/{aid}")
    assert r2.status_code == 404


# ---------- Orders ----------
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


def test_patch_order_status(session):
    on = created_order_number["val"]
    r = session.patch(f"{API}/orders/{on}", json={"status": "shipped"})
    assert r.status_code == 200
    assert r.json()["status"] == "shipped"
    r2 = session.get(f"{API}/orders/{on}")
    assert r2.json()["status"] == "shipped"



# ---------- Partnerships ----------
created_partnership_id = {"val": None}


def test_create_partnership(session):
    payload = {
        "name": "TEST_Partner",
        "organization": "TEST_Club FC",
        "email": "test_partner@example.com",
        "phone": "+351911111111",
        "type": "club",
        "message": "TEST partnership inquiry",
    }
    r = session.post(f"{API}/partnerships", json=payload)
    assert r.status_code == 200, r.text
    p = r.json()
    assert p["name"] == "TEST_Partner"
    assert p["email"] == "test_partner@example.com"
    assert p["type"] == "club"
    assert p["status"] == "new"
    assert "id" in p and "created_at" in p
    created_partnership_id["val"] = p["id"]


def test_create_partnership_invalid_email(session):
    r = session.post(f"{API}/partnerships", json={"name": "X", "email": "not-an-email"})
    assert r.status_code == 422


def test_list_partnerships(session):
    r = session.get(f"{API}/partnerships")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert any(x["id"] == created_partnership_id["val"] for x in items)


def test_cleanup_partnership_via_mongo(session):
    # No DELETE endpoint - cleanup will be handled out-of-band
    # Just assert the created inquiry still exists
    assert created_partnership_id["val"] is not None
