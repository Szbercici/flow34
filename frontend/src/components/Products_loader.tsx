export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Flow Watermelon",
    price: 12.99,
    category: "Microdrink",
    img: "melon.png",
    description: "Refreshing watermelon flavored hydration cubes with vitamins and zero sugar.",
  },
  {
    id: 2,
    name: "Flow Energy",
    price: 14.99,
    category: "Microdrink",
    img: "energy.png",
    description: "Classic energy drink flavor boosted with caffeine for focus and power.",
  },
  {
    id: 3,
    name: "Flow Forest Fruit",
    price: 12.99,
    category: "Microdrink",
    img: "erdei.png",
    description: "A berry mix sensation. Tasty hydration with natural forest fruit flavors.",
  },
  {
    id: 4,
    name: "Flow Lemon",
    price: 12.99,
    category: "Microdrink",
    img: "lemonpng.png",
    description: "Zesty and fresh lemon flavor. Simple hydration rich in vitamins.",
  },
  {
    id: 5,
    name: "Flow Green Electrolyte (Limited)",
    price: 16.99,
    category: "Electrolytes",
    img: "zold.png",
    description: "Limited edition green formula packed with essential electrolytes for active hydration.",
  },
  {
    id: 6,
    name: "Flow Cola",
    price: 12.99,
    category: "Microdrink",
    img: "cola.png",
    description: "The classic cola taste, reimagined as refreshing hydration cubes with zero sugar and essential vitamins.",
  }
];