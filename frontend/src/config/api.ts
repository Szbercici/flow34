export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://51.20.31.211:8080";

export const API_PRODUCTS_URL = `${API_BASE_URL}/api/products`;

export const getImageUrl = (path: string) => `${API_BASE_URL}/${path}`;
