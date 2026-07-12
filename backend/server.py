from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, EmailStr
from typing import List, Optional, Annotated
from bson import ObjectId
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

PyObjectId = Annotated[str, BeforeValidator(str)]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------- Models ----------
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    tagline: str
    description: str
    price: float
    currency: str = "EUR"
    image: str
    gallery: List[str] = []
    specs: List[str] = []
    sizes: List[str] = []


class CartItem(BaseModel):
    product_id: str
    name: str
    size: Optional[str] = None
    price: float
    quantity: int
    image: Optional[str] = None


class ShippingInfo(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    address: str
    city: str
    postal_code: str
    country: str


class BillingInfo(BaseModel):
    same_as_shipping: bool = True
    full_name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None


class OrderCreate(BaseModel):
    items: List[CartItem]
    shipping: ShippingInfo
    billing: BillingInfo
    subtotal: float
    shipping_cost: float
    total: float
    notes: Optional[str] = None


class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str
    items: List[CartItem]
    shipping: ShippingInfo
    billing: BillingInfo
    subtotal: float
    shipping_cost: float
    total: float
    notes: Optional[str] = None
    status: str = "pending"
    created_at: str = Field(default_factory=now_iso)


# ---------- Seed ----------
DEFAULT_PRODUCT = {
    "id": "xoks-pro-elite",
    "name": "Caneleiras XOK'S Pro Elite",
    "tagline": "Proteção de elite. Leveza absoluta.",
    "description": "As caneleiras XOK'S Pro Elite combinam uma casca externa em fibra de carbono com um núcleo de espuma EVA de alta densidade para absorver o impacto sem comprometer a leveza. Concebidas com design anatómico para se moldarem à perna, garantem conforto total durante os 90 minutos.",
    "price": 49.99,
    "currency": "EUR",
    "image": "",
    "gallery": [],
    "specs": [
        "Casca externa em fibra de carbono ultra resistente",
        "Núcleo em espuma EVA de alta densidade",
        "Peso: apenas 55g por caneleira",
        "Design anatómico esquerdo/direito",
        "Tratamento antibacteriano e respirável",
        "Cintas elásticas ajustáveis incluídas",
    ],
    "sizes": ["S", "M", "L", "XL"],
}


async def seed_product(image_url: str, gallery: List[str]):
    existing = await db.products.find_one({"id": DEFAULT_PRODUCT["id"]})
    doc = dict(DEFAULT_PRODUCT)
    doc["image"] = image_url
    doc["gallery"] = gallery
    if existing:
        await db.products.update_one({"id": DEFAULT_PRODUCT["id"]}, {"$set": {"image": image_url, "gallery": gallery}})
    else:
        await db.products.insert_one(doc)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "XOK'S API online"}


@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find({}, {"_id": 0}).to_list(100)
    return [Product(**p) for p in products]


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    p = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not p:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return Product(**p)


@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate):
    if not payload.items:
        raise HTTPException(status_code=400, detail="O carrinho está vazio")
    count = await db.orders.count_documents({})
    order_number = f"XOKS-{1000 + count + 1}"
    order = Order(
        order_number=order_number,
        items=payload.items,
        shipping=payload.shipping,
        billing=payload.billing,
        subtotal=payload.subtotal,
        shipping_cost=payload.shipping_cost,
        total=payload.total,
        notes=payload.notes,
    )
    await db.orders.insert_one(order.model_dump())
    return order


@api_router.get("/orders", response_model=List[Order])
async def list_orders():
    orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Order(**o) for o in orders]


@api_router.get("/orders/{order_number}", response_model=Order)
async def get_order(order_number: str):
    o = await db.orders.find_one({"order_number": order_number}, {"_id": 0})
    if not o:
        raise HTTPException(status_code=404, detail="Encomenda não encontrada")
    return Order(**o)


class OrderStatusUpdate(BaseModel):
    status: str


@api_router.patch("/orders/{order_number}", response_model=Order)
async def update_order_status(order_number: str, payload: OrderStatusUpdate):
    o = await db.orders.find_one({"order_number": order_number}, {"_id": 0})
    if not o:
        raise HTTPException(status_code=404, detail="Encomenda não encontrada")
    await db.orders.update_one({"order_number": order_number}, {"$set": {"status": payload.status}})
    o["status"] = payload.status
    return Order(**o)


PRODUCT_IMAGE = "https://static.prod-images.emergentagent.com/jobs/e3e88c3b-8ab0-416f-9559-d69eb906f401/images/4ff5651be95298b9e2040efec77f5bf4d66011d5c9e5b85cc95fe4e5a3d31208.png"
PRODUCT_GALLERY = [
    "https://static.prod-images.emergentagent.com/jobs/e3e88c3b-8ab0-416f-9559-d69eb906f401/images/4ff5651be95298b9e2040efec77f5bf4d66011d5c9e5b85cc95fe4e5a3d31208.png",
    "https://static.prod-images.emergentagent.com/jobs/e3e88c3b-8ab0-416f-9559-d69eb906f401/images/61995ac65891f9a1402d02b448980467ff74b5412d2169c7b07e8bf7f85af843.png",
]


@app.on_event("startup")
async def on_startup():
    await seed_product(PRODUCT_IMAGE, PRODUCT_GALLERY)
    logger.info("Product seeded")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
