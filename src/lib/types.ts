export type MenuItemView = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  tag: string | null;
  rating: number;
  isSignature: boolean;
  sortOrder: number;
};

export type ReviewView = {
  id: number;
  name: string;
  quote: string;
  rating: number;
  role: string;
  createdAt: string;
};

export type CartLine = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type OrderConfirmation = {
  orderNumber: string;
  customerName: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedMinutes: number;
};

export type ShowcaseDish = {
  id: number;
  name: string;
  note: string;
  price: number;
  image: string;
  label: string;
};
