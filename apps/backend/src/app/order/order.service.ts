import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '@plasma-crm/shared-types/order';

@Injectable()
export class OrderService {
  private readonly orders: Order[] = [
    {
      id: 1,
      customerId: 1,
      customerName: 'John Doe',
      orderNumber: 'ORD-2024-001',
      status: 'delivered',
      items: [
        {
          id: 1,
          productName: 'Laptop Computer',
          quantity: 1,
          unitPrice: 1299.99,
          totalPrice: 1299.99,
        },
        {
          id: 2,
          productName: 'Wireless Mouse',
          quantity: 2,
          unitPrice: 29.99,
          totalPrice: 59.98,
        },
      ],
      subtotal: 1359.97,
      tax: 108.80,
      total: 1468.77,
      orderDate: new Date('2024-01-15'),
      expectedDeliveryDate: new Date('2024-01-22'),
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-22'),
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'Jane Smith',
      orderNumber: 'ORD-2024-002',
      status: 'shipped',
      items: [
        {
          id: 3,
          productName: 'Office Chair',
          quantity: 1,
          unitPrice: 299.99,
          totalPrice: 299.99,
        },
        {
          id: 4,
          productName: 'Desk Lamp',
          quantity: 1,
          unitPrice: 79.99,
          totalPrice: 79.99,
        },
      ],
      subtotal: 379.98,
      tax: 30.40,
      total: 410.38,
      orderDate: new Date('2024-01-20'),
      expectedDeliveryDate: new Date('2024-01-27'),
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-25'),
    },
    {
      id: 3,
      customerId: 3,
      customerName: 'Bob Johnson',
      orderNumber: 'ORD-2024-003',
      status: 'processing',
      items: [
        {
          id: 5,
          productName: 'Printer',
          quantity: 1,
          unitPrice: 199.99,
          totalPrice: 199.99,
        },
        {
          id: 6,
          productName: 'Printer Paper (500 sheets)',
          quantity: 3,
          unitPrice: 12.99,
          totalPrice: 38.97,
        },
      ],
      subtotal: 238.96,
      tax: 19.12,
      total: 258.08,
      orderDate: new Date('2024-01-25'),
      expectedDeliveryDate: new Date('2024-02-01'),
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-26'),
    },
    {
      id: 4,
      customerId: 4,
      customerName: 'Alice Brown',
      orderNumber: 'ORD-2024-004',
      status: 'confirmed',
      items: [
        {
          id: 7,
          productName: 'Wireless Keyboard',
          quantity: 1,
          unitPrice: 89.99,
          totalPrice: 89.99,
        },
      ],
      subtotal: 89.99,
      tax: 7.20,
      total: 97.19,
      orderDate: new Date('2024-02-01'),
      expectedDeliveryDate: new Date('2024-02-08'),
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-02'),
    },
    {
      id: 5,
      customerId: 5,
      customerName: 'Charlie Wilson',
      orderNumber: 'ORD-2024-005',
      status: 'pending',
      items: [
        {
          id: 8,
          productName: 'External Hard Drive',
          quantity: 1,
          unitPrice: 149.99,
          totalPrice: 149.99,
        },
        {
          id: 9,
          productName: 'USB Cable',
          quantity: 2,
          unitPrice: 9.99,
          totalPrice: 19.98,
        },
      ],
      subtotal: 169.97,
      tax: 13.60,
      total: 183.57,
      orderDate: new Date('2024-02-05'),
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-05'),
    },
  ];

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = this.orders.find(order => order.id === id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findByCustomer(customerId: number): Promise<Order[]> {
    return this.orders.filter(order => order.customerId === customerId);
  }

  async create(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const newOrder: Order = {
      id: Math.max(...this.orders.map(o => o.id)) + 1,
      orderNumber: `ORD-2024-${String(Math.max(...this.orders.map(o => o.id)) + 1).padStart(3, '0')}`,
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Calculate totals if items are provided
    if (newOrder.items && newOrder.items.length > 0) {
      newOrder.subtotal = newOrder.items.reduce((sum, item) => sum + item.totalPrice, 0);
      newOrder.tax = newOrder.subtotal * 0.08; // 8% tax
      newOrder.total = newOrder.subtotal + newOrder.tax;
    }

    this.orders.push(newOrder);
    return newOrder;
  }

  async update(id: number, orderData: Partial<Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>>): Promise<Order> {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updatedOrder = {
      ...this.orders[orderIndex],
      ...orderData,
      updatedAt: new Date(),
    };

    // Recalculate totals if items were updated
    if (orderData.items && orderData.items.length > 0) {
      updatedOrder.subtotal = orderData.items.reduce((sum, item) => sum + item.totalPrice, 0);
      updatedOrder.tax = updatedOrder.subtotal * 0.08;
      updatedOrder.total = updatedOrder.subtotal + updatedOrder.tax;
    }

    this.orders[orderIndex] = updatedOrder;
    return updatedOrder;
  }

  async delete(id: number): Promise<void> {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    this.orders.splice(orderIndex, 1);
  }
}