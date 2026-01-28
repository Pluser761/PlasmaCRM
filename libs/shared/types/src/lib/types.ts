export type User = {
  id: number;
  username: string;
  password: string;
};

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: number;
  customerId: number;
  customerName: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderDate: Date;
  expectedDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

// Auth-related types
export type JwtKeys = {
  access_token: string;
  refresh_token: string;
};

// API Response types
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

// Pagination types
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};