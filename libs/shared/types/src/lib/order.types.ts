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
  statusDisplay?: string; // HTML string with styled status badge
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderDate: Date;
  expectedDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};