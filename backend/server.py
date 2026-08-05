from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
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


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def gen_id() -> str:
    return str(uuid.uuid4())


# ---------- Models ----------
class ColorVariant(BaseModel):
    name: str
    image: str
    hex: str = "#7EDAF2"


class ProductBase(BaseModel):
    name: str
    tagline: str = ""
    description: str = ""
    price: float
    old_price: Optional[float] = None
    currency: str = "EUR"
    image: str = ""
    gallery: List[str] = []
    specs: List[str] = []
    sizes: List[str] = []
    colors: List[ColorVariant] = []
    badge: Optional[str] = None
    featured: bool = False
    active: bool = True


class Product(ProductBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=gen_id)


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    old_price: Optional[float] = None
    image: Optional[str] = None
    gallery: Optional[List[str]] = None
    specs: Optional[List[str]] = None
    sizes: Optional[List[str]] = None
    colors: Optional[List[ColorVariant]] = None
    badge: Optional[str] = None
    featured: Optional[bool] = None
    active: Optional[bool] = None


class Athlete(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=gen_id)
    name: str = ""
    club: str = ""
    image: str
    order: int = 0


class AthleteCreate(BaseModel):
    name: str = ""
    club: str = ""
    image: str
    order: int = 0


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
    id: str = Field(default_factory=gen_id)
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


class OrderStatusUpdate(BaseModel):
    status: str


# ---------- Seed data ----------
IMG = "https://static.prod-images.emergentagent.com/jobs/e3e88c3b-8ab0-416f-9559-d69eb906f401/images"
SEED_PRODUCTS = [
    {
        "id": "xoks-pro-elite",
        "name": "Caneleiras XOK'S Pro Elite",
        "tagline": "Proteção de elite. Leveza absoluta.",
        "description": "As caneleiras XOK'S Pro Elite combinam uma casca externa em fibra de carbono com um núcleo de espuma EVA de alta densidade para absorver o impacto sem comprometer a leveza. Concebidas com design anatómico para se moldarem à perna, garantem conforto total durante os 90 minutos.",
        "price": 49.99,
        "old_price": 69.99,
        "image": f"{IMG}/4ff5651be95298b9e2040efec77f5bf4d66011d5c9e5b85cc95fe4e5a3d31208.png",
        "gallery": [
            f"{IMG}/4ff5651be95298b9e2040efec77f5bf4d66011d5c9e5b85cc95fe4e5a3d31208.png",
            f"{IMG}/61995ac65891f9a1402d02b448980467ff74b5412d2169c7b07e8bf7f85af843.png",
        ],
        "specs": [
            "Casca externa em fibra de carbono ultra resistente",
            "Núcleo em espuma EVA de alta densidade",
            "Peso: apenas 55g por caneleira",
            "Design anatómico esquerdo/direito",
            "Tratamento antibacteriano e respirável",
            "Cintas elásticas ajustáveis incluídas",
        ],
        "sizes": ["S", "M", "L", "XL"],
        "badge": "Best Seller",
        "featured": True,
    },
    {
        "id": "xoks-carbon-blue",
        "name": "Caneleiras XOK'S Carbon Blue",
        "tagline": "Estilo elétrico. Performance máxima.",
        "description": "Edição Carbon Blue com acabamento em fibra de carbono azul elétrico e detalhes em ciano. Máxima proteção com um visual arrojado para quem se destaca dentro e fora de campo.",
        "price": 54.99,
        "old_price": 74.99,
        "image": f"{IMG}/92039bac615015114b5d287989c817864fd81514090c69e93e738c15dbfa8146.png",
        "gallery": [f"{IMG}/92039bac615015114b5d287989c817864fd81514090c69e93e738c15dbfa8146.png"],
        "specs": [
            "Fibra de carbono azul elétrico",
            "Núcleo EVA de absorção de impacto",
            "Peso: 58g por caneleira",
            "Design anatómico premium",
            "Cintas de fixação reforçadas",
        ],
        "sizes": ["S", "M", "L", "XL"],
        "badge": "Novo",
        "featured": True,
    },
    {
        "id": "xoks-game",
        "name": "Caneleiras XOK'S Game",
        "tagline": "Game Core",
        "description": "As XOK'S Game combinam proteção de topo com um design vibrante e ultraleve. Construídas com Multi-Layer Composite Technology™ para dispersar o impacto, e uma camada protetora anti-riscos que mantém o visual impecável jogo após jogo. Disponíveis em quatro cores.",
        "price": 49.90,
        "image": "/game-blue.png",
        "gallery": ["/game-blue.png", "/game-yellow.png", "/game-orange.png", "/game-green.png"],
        "colors": [
            {"name": "Azul", "image": "/game-blue.png", "hex": "#2563EB"},
            {"name": "Amarelo", "image": "/game-yellow.png", "hex": "#FACC15"},
            {"name": "Laranja", "image": "/game-orange.png", "hex": "#F97316"},
            {"name": "Verde", "image": "/game-green.png", "hex": "#15803D"},
        ],
        "specs": [
            "Multi-Layer Composite Technology™",
            "Camada protetora anti-riscos",
            "Design ergonómico e ultraleve",
        ],
        "sizes": ["S", "M", "L", "XL"],
        "badge": "Novo",
        "featured": True,
    },
    {
        "id": "xoks-stealth-ankle",
        "name": "Caneleiras XOK'S Stealth Ankle",
        "tagline": "Proteção total. Tornozelo blindado.",
        "description": "O modelo mais completo da gama XOK'S, com proteção integrada do tornozelo. Design stealth all-black com logo em ciano subtil. Máxima segurança para quem entra forte.",
        "price": 64.99,
        "old_price": 84.99,
        "image": f"{IMG}/22c43a815fcf97429779fb32505174652436a21be4aa538c7095870ef6e9aa6d.png",
        "gallery": [f"{IMG}/22c43a815fcf97429779fb32505174652436a21be4aa538c7095870ef6e9aa6d.png"],
        "specs": [
            "Proteção integrada do tornozelo",
            "Casca em fibra de carbono stealth",
            "Núcleo EVA de dupla densidade",
            "Peso: 78g por caneleira",
            "Meia de compressão incluída",
        ],
        "sizes": ["S", "M", "L", "XL"],
        "badge": "Pro",
        "featured": True,
    },
]

SEED_ATHLETES = [
    {"id": "ath-5", "name": "Telma Pereira", "club": "", "image": "/atleta5.jpg", "order": 1},
    {"id": "ath-4", "name": "Ricardo Guimarães", "club": "", "image": "/atleta4.jpg", "order": 2},
    {"id": "ath-3", "name": "Luís Esteves", "club": "", "image": "/atleta3.jpg", "order": 3},
    {"id": "ath-2", "name": "Ricardo Horta", "club": "", "image": "/atleta2.jpg", "order": 4},
    {"id": "ath-1", "name": "Douglas Tanque", "club": "", "image": "/atleta1.jpg", "order": 5},
]


async def seed():
    if await db.products.count_documents({}) == 0:
        await db.products.insert_many([dict(p) for p in SEED_PRODUCTS])
        logger.info("Products seeded")
    else:
        for p in SEED_PRODUCTS:
            await db.products.update_one(
                {"id": p["id"]},
                {"$setOnInsert": dict(p)},
                upsert=True,
            )
    if await db.athletes.count_documents({}) == 0:
        await db.athletes.insert_many([dict(a) for a in SEED_ATHLETES])
        logger.info("Athletes seeded")


# ---------- Product routes ----------
@api_router.get("/")
async def root():
    return {"message": "XOK'S API online"}


@api_router.get("/products", response_model=List[Product])
async def get_products(include_inactive: bool = False):
    q = {} if include_inactive else {"active": {"$ne": False}}
    products = await db.products.find(q, {"_id": 0}).to_list(200)
    return [Product(**p) for p in products]


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    p = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not p:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return Product(**p)


@api_router.post("/products", response_model=Product)
async def create_product(payload: ProductBase):
    product = Product(**payload.model_dump())
    await db.products.insert_one(product.model_dump())
    return product


@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, payload: ProductUpdate):
    existing = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    if updates:
        await db.products.update_one({"id": product_id}, {"$set": updates})
    updated = await db.products.find_one({"id": product_id}, {"_id": 0})
    return Product(**updated)


@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    res = await db.products.delete_one({"id": product_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return {"deleted": True}


# ---------- Athlete routes ----------
@api_router.get("/athletes", response_model=List[Athlete])
async def get_athletes():
    athletes = await db.athletes.find({}, {"_id": 0}).sort("order", 1).to_list(200)
    return [Athlete(**a) for a in athletes]


@api_router.post("/athletes", response_model=Athlete)
async def create_athlete(payload: AthleteCreate):
    athlete = Athlete(**payload.model_dump())
    await db.athletes.insert_one(athlete.model_dump())
    return athlete


@api_router.delete("/athletes/{athlete_id}")
async def delete_athlete(athlete_id: str):
    res = await db.athletes.delete_one({"id": athlete_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Atleta não encontrado")
    return {"deleted": True}


# ---------- Partnership routes ----------
class PartnershipCreate(BaseModel):
    name: str
    organization: str = ""
    email: EmailStr
    phone: str = ""
    type: str = "club"
    message: str = ""


class Partnership(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=gen_id)
    name: str
    organization: str = ""
    email: EmailStr
    phone: str = ""
    type: str = "club"
    message: str = ""
    status: str = "new"
    created_at: str = Field(default_factory=now_iso)


@api_router.post("/partnerships", response_model=Partnership)
async def create_partnership(payload: PartnershipCreate):
    inquiry = Partnership(**payload.model_dump())
    await db.partnerships.insert_one(inquiry.model_dump())
    return inquiry


@api_router.get("/partnerships", response_model=List[Partnership])
async def list_partnerships():
    items = await db.partnerships.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Partnership(**i) for i in items]


# ---------- Order routes ----------
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


@api_router.patch("/orders/{order_number}", response_model=Order)
async def update_order_status(order_number: str, payload: OrderStatusUpdate):
    o = await db.orders.find_one({"order_number": order_number}, {"_id": 0})
    if not o:
        raise HTTPException(status_code=404, detail="Encomenda não encontrada")
    await db.orders.update_one({"order_number": order_number}, {"$set": {"status": payload.status}})
    o["status"] = payload.status
    return Order(**o)


@app.on_event("startup")
async def on_startup():
    await seed()


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
