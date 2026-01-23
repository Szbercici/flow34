export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
export const API_PRODUCTS_URL = `${API_BASE_URL}/api/products`;
export const getImageUrl = (filename: string) => `${API_BASE_URL}/uploads/${filename}`;
