import { API_BASE_URL } from "../config/api";

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  role?: string;
  ROLE?: string;
};

export type Product = {
  id: number;
  name: string;
  price: number | string;
  description?: string;
  category: string;
  img?: string;
};

export type OrderItem = {
  id: number;
  name: string;
  img?: string;
  price: number | string;
  quantity: number | string;
  lineTotal?: number | string;
};

export type UserOrder = {
  firstName?: string;
  lastName?: string;
  email?: string;
  address: string;
  items: OrderItem[];
};

export type AdminOrderApiRecord = {
  orderId: number;
  userId: number;
  username: string;
  email: string | null;
  address: string;
  createdAt: string;
  totalItems: number;
  items: OrderItem[];
};

export type UserOrderSummary = {
  userId: number;
  username: string;
  email: string;
  role: string;
  orderCount: number;
  itemsSold: number;
  totalRevenue: number;
  primaryAddress: string;
};

export type AdminOrderRecord = {
  id: number;
  orderId: number;
  userId: number;
  username: string;
  email: string;
  address: string;
  createdAt: string;
  itemCount: number;
  totalRevenue: number;
  items: OrderItem[];
};

export type AdminSnapshot = {
  users: AdminUser[];
  products: Product[];
  orderSummaries: UserOrderSummary[];
  orders: AdminOrderRecord[];
};

export const emptyAdminSnapshot: AdminSnapshot = {
  users: [],
  products: [],
  orderSummaries: [],
  orders: [],
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const numberFormatter = new Intl.NumberFormat("en-US");

export const toNumber = (value: number | string | undefined) => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
};

export const normalizeStoredImage = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const parsedUrl = new URL(trimmed);
    return parsedUrl.pathname.replace(/^\/+/, "");
  } catch {
    return trimmed.replace(/^\/+/, "");
  }
};

export const resolveProductImage = (value?: string) => {
  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${API_BASE_URL}/${value.replace(/^\/+/, "")}`;
};

export const fetchAdminSnapshot = async (): Promise<AdminSnapshot> => {
  const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/api/users/admin/all`, {
      credentials: "include",
    }),
    fetch(`${API_BASE_URL}/api/products`),
    fetch(`${API_BASE_URL}/api/admin/orders`, {
      credentials: "include",
    }),
  ]);

  if (!usersResponse.ok) {
    throw new Error("Users could not be loaded.");
  }

  if (!productsResponse.ok) {
    throw new Error("Products could not be loaded.");
  }

  if (!ordersResponse.ok) {
    throw new Error("Orders could not be loaded.");
  }

  const [users, products, adminOrders] = await Promise.all([
    usersResponse.json() as Promise<AdminUser[]>,
    productsResponse.json() as Promise<Product[]>,
    ordersResponse.json() as Promise<AdminOrderApiRecord[]>,
  ]);

  const orders = adminOrders.map((order) => ({
    id: order.orderId,
    orderId: order.orderId,
    userId: order.userId,
    username: order.username,
    email: order.email ?? "No email",
    address: order.address,
    createdAt: order.createdAt,
    itemCount: order.totalItems,
    totalRevenue: order.items.reduce(
      (sum, item) => sum + toNumber(item.lineTotal ?? item.price),
      0,
    ),
    items: order.items,
  }));

  const ordersByUser = orders.reduce<Record<number, AdminOrderRecord[]>>(
    (accumulator, order) => {
      if (!accumulator[order.userId]) {
        accumulator[order.userId] = [];
      }

      accumulator[order.userId].push(order);
      return accumulator;
    },
    {},
  );

  const orderSummaries = users.map((user) => {
    const role = user.role ?? user.ROLE ?? "USER";
    const userOrders = ordersByUser[user.id] ?? [];
    const itemsSold = userOrders.reduce(
      (sum, order) =>
        sum +
        order.items.reduce((itemSum, item) => itemSum + toNumber(item.quantity), 0),
      0,
    );
    const totalRevenue = userOrders.reduce(
      (sum, order) =>
        sum +
        order.items.reduce(
          (itemSum, item) => itemSum + toNumber(item.lineTotal ?? item.price),
          0,
        ),
      0,
    );

    return {
      userId: user.id,
      username: user.username,
      email: user.email,
      role,
      orderCount: userOrders.length,
      itemsSold,
      totalRevenue,
      primaryAddress: userOrders[0]?.address || "No orders yet",
    };
  });

  return {
    users,
    products,
    orderSummaries,
    orders,
  };
};