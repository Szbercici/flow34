import { useState, useEffect } from "react";
import { API_PRODUCTS_URL } from "../config/api";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  description: string;
};

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_PRODUCTS_URL);
        if (!response.ok) {
          throw new Error("Hiba az API hívásban");
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ismeretlen hiba");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default Products;


