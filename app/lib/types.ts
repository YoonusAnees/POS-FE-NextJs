export type Role = "USER" | "ADMIN";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type ProductImageDTO = { url: string };

export type ProductReviewDto = {
  productId: number;
  rating: number;
  comment?: string;
};

export type ProductDTO = {
  id: number;
  name: string;
  description: string;
  category?: string;
  price: number;
  ratings: number;
  seller: string;
  stock: number;
  numOfReviews: number;
  images: ProductImageDTO[];
  reviews: ProductReviewDto[];
};

export type ProductsResponse = {
  products: ProductDTO[];
  total: number;
};

export type CartItem = {
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
};

export type OrderItemDTO = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  productId: number;
};

export type CreateOrderRequest = {
  orderItem: OrderItemDTO[];
};

export type Order = {
  orderId: number;
  orderItems: any[];
  totalItemAmount: number;
  taxAmount: number;
  totalAmount: number;
  status: string;
  referenceNo: string;
};
