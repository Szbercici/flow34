import React, { useState, createContext, ReactNode, useContext, useEffect} from "react";

// 0. Először definiáljuk, hogy néz ki egy Termék objektum
export interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  description: string;
}

// 1. A Context típusba beletesszük a függvény definícióját
interface ContextType {
  items: CartItem[]; // Átírtuk number-ről listára!
  removeFromCart: (product: CartItem) => void;
  addToCart: (product: CartItem) => void; // <--- EZT KÉRTED (A függvény típusa)
}

export const Context = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ProviderProps) => {
  // Állapot: Kezdőérték egy üres tömb []
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      // Megpróbáljuk kiolvasni a "cart" nevű kulcsot
      const savedCart = sessionStorage.getItem("cart");
      
      // Ha van adat, visszaalakítjuk (JSON.parse) és azt használjuk
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      // Ha hiba van (pl. sérült adat), üres tömbbel indulunk
      return [];
    }
  });
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // 2. <--- ITT A FÜGGVÉNY IMPLEMENTÁCIÓJA
  const addToCart = (product: CartItem) => {
    setItems((prevItems) => [...prevItems, product]); 
    // Lemásolja a régi listát (...prevItems) és hozzáadja az újat
  };

  const removeFromCart = (product: CartItem) => {
    for (const index in items) {
        const currentProduct = items[index]; 
        if(currentProduct == product){
            setItems((prevItems) => prevItems.filter((_, i) => i !== parseInt(index))); 
            return;
        }
    }
  };
  

  

  return (
    // 3. A függvényt is átadjuk a Provider value-ban
    <Context.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </Context.Provider>
  );
};

export const useCart = () => {
    // 1. Lekérjük az adatot
    const context = useContext(Context);

     // 2. Ellenőrizzük: Ha "undefined", akkor valaki a Provider-en kívül próbálja használni
    if (context === undefined) {
     throw new Error("A useCart-ot csak a ContextProvider-en belül lehet használni!");
     }

     // 3. Ha minden oké, visszaadjuk az adatot (items, addToCart)
     return context;
};