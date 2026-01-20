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
    img: "microdrink-melon.png",
    description: "Refreshing watermelon flavored hydration cubes with vitamins and zero sugar.",
  },
  {
    id: 2,
    name: "Flow Energy",
    price: 14.99,
    category: "Microdrink",
    img: "microdrink-energy.png",
    description: "Classic energy drink flavor boosted with caffeine for focus and power.",
  },
  {
    id: 3,
    name: "Flow Forest Fruit",
    price: 12.99,
    category: "Microdrink",
    img: "microdrink-forest-fruit.png",
    description: "A berry mix sensation. Tasty hydration with natural forest fruit flavors.",
  },
  {
    id: 4,
    name: "Flow Lemon",
    price: 12.99,
    category: "Microdrink",
    img: "microdrink-lemon.png",
    description: "Zesty and fresh lemon flavor. Simple hydration rich in vitamins.",
  },
  {
    id: 5,
    name: "Flow Green Electrolyte (Limited)",
    price: 16.99,
    category: "Microdrink",
    img: "microdrink-cucumber.png",
    description: "Limited edition green formula packed with essential electrolytes for active hydration.",
  },
  {
    id: 6,
    name: "Flow Cola",
    price: 12.99,
    category: "Microdrink",
    img: "microdrink-cola.png",
    description: "The classic cola taste, reimagined as refreshing hydration cubes with zero sugar and essential vitamins.",
  },
  {
    id: 7,
    name: "Metal Water bottle",
    price: 12.99,
    category: "Water Bottles",
    img: "metal-water-bottle.png",
    description: "Durable and stylish metal water bottle to keep you hydrated on the go.",
  },
  {
    id: 8,
    name: "Water bottle blue",
    price: 8.99,
    category: "Water Bottles",
    img: "blue-water-bottle.png",
    description: "Lightweight and convenient plastic water bottle for everyday use.",
  },
  {
    id: 9,
    name: "Water bottle purple",
    price: 12.99,
    category: "Water Bottles",
    img: "purple-water-bottle.png",
    description: "Lightweight and functional water bottle in a vibrant purple color.",
  },
  {
    id: 10,
    name: "Water bottle red",
    price: 10.99,
    category: "Water Bottles",
    img: "red-water-bottle.png",
    description: "Lightweight and functional water bottle in a vibrant red color.",
  }
];