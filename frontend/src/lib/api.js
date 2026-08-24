import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;
export const BACKEND = BACKEND_URL;

export const resolveUrl = (u) => {
  if (!u) return u;
  if (/^https?:\/\//i.test(u)) return u;
  return `${BACKEND_URL}${u.startsWith("/") ? "" : "/"}${u}`;
};

export const api = axios.create({ baseURL: API });

export const formatPrice = (value, currency = "EUR") =>
  new Intl.NumberFormat("pt-PT", { style: "currency", currency }).format(value);

export const SHIPPING_COST = 4.99;
export const FREE_SHIPPING_THRESHOLD = 60;
