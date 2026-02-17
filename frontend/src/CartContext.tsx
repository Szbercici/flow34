  import React, { useState, createContext, ReactNode, useContext, useEffect} from "react";
  import { API_BASE_URL } from "./config/api";
  import { useAuth } from "./AuthContext";
  import { toast } from "sonner";
  export const CartContext = createContext<ContextType | undefined>(undefined);
  
  export interface CartItem {
    id: number;
    name: string;
    price: number;
    category: string;
    img: string;
    quantity: number;
  }

  export const useCart = () => {
    const context = useContext(CartContext);
    
    if (!context) {
      throw new Error("A useCart hook-ot csak a ContextProvideren belül lehet használni!");
    }
    
    return context;
  };
  // 1. A Context típusba beletesszük a függvény definícióját
  interface ContextType {
    items: CartItem[]; // Átírtuk number-ről listára!
    removeFromCart: (product: CartItem) => void;
    addToCart: (product: CartItem) => void;
  }

  export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();

    // 1. Kezdés: Azonnal betöltjük a LocalStorage-ot, hogy ne legyen üres a kép
    const [items, setItems] = useState<CartItem[]>(() => {
      try {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
      } catch {
        return [];
      }
    });

    // 2. API betöltés: Amikor az oldal elindul (vagy a user belép), frissítünk a szerverről
    useEffect(() => {
      const fetchCart = async () => {
        if (!user) return; // Csawwk akkor kérünk le, ha be van jelentkezve
        try {
          const response = await fetch(`${API_BASE_URL}/api/cart`, {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            const serverItems = data.items; // Kezeljük, ha a JSON-ben van .items kulcs, és azt is, ha sima lista
            setItems(serverItems);
          }
        } catch (error) {
          console.error("API hiba betöltéskor:", error);
        }
      };
      fetchCart();
    }, [user]);
  // 3. Mentés: LocalStorage + Szerver
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(items));

      const syncWithServer = async () => {
    if (user) {
      try {
        const payload = items.map(item => ({
          productId: item.id,
          quantity: item.quantity
          
        }));
        await fetch(`${API_BASE_URL}/api/cart/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload }), 
          credentials: "include",
        });
        
        console.log("Sikeres szinkronizálás a rövidített adatokkal.");
      } catch (error) {
        console.error("Szerver hiba:", error);
      }
    }
  };

      syncWithServer();
    }, [items, user]);

    const addToCart = (product: CartItem) => {
        setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);

        if (existingItem) {
          
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        } else {
          // Ha új, akkor hozzáadjuk a listához, és beállítjuk az 1-es mennyiséget
          return [...prevItems, { ...product, quantity: 1 }];
        
        }
        
      });
    };

    const removeFromCart = (product: CartItem) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        // Ha több van belőle, csak a darabszámot csökkentjük
        if (existingItem && (existingItem.quantity || 1) > 1) {
          return prevItems.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity! - 1 } 
              : item
          );
        }
        
        // Ha csak 1 van, vagy nincs benne, töröljük a listából (index alapján)
        const index = prevItems.findIndex((item) => item.id === product.id);
        if (index === -1) return prevItems;
        const newItems = [...prevItems];
        newItems.splice(index, 1);
        return newItems;
      });
    };

    return (
      <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };