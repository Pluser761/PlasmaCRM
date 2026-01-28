import { User } from './auth.types';
import { Customer } from './customer.types';
import { Order, OrderItem, OrderStatus } from './order.types';
import { Product } from './product.types';
import { JwtKeys } from './auth.types';
import { ApiResponse, PaginatedResponse } from './api.types';

describe('Shared Types', () => {
  describe('User type', () => {
    it('should create a valid User object', () => {
      const user: User = {
        id: 1,
        username: 'john_doe',
        password: 'hashed_password'
      };

      expect(user.id).toBe(1);
      expect(user.username).toBe('john_doe');
      expect(user.password).toBe('hashed_password');
    });
  });

  describe('Customer type', () => {
    it('should create a valid Customer object', () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-555-0123',
        address: '123 Main St',
        city: 'New York',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(customer.id).toBe(1);
      expect(customer.name).toBe('John Doe');
      expect(customer.email).toBe('john@example.com');
    });
  });

  describe('Order types', () => {
    it('should create a valid OrderItem', () => {
      const item: OrderItem = {
        id: 1,
        productName: 'Test Product',
        quantity: 2,
        unitPrice: 29.99,
        totalPrice: 59.98
      };

      expect(item.quantity).toBe(2);
      expect(item.totalPrice).toBe(59.98);
    });

    it('should create a valid Order', () => {
      const order: Order = {
        id: 1,
        customerId: 1,
        customerName: 'John Doe',
        orderNumber: 'ORD-2024-001',
        status: 'pending' as OrderStatus,
        items: [],
        subtotal: 100,
        tax: 8,
        total: 108,
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(order.id).toBe(1);
      expect(order.status).toBe('pending');
      expect(order.total).toBe(108);
    });

    it('should validate OrderStatus union type', () => {
      const validStatuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

      validStatuses.forEach(status => {
        const order: Order = {
          id: 1,
          customerId: 1,
          customerName: 'Test',
          orderNumber: 'ORD-001',
          status: status,
          items: [],
          subtotal: 0,
          tax: 0,
          total: 0,
          orderDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        };

        expect(order.status).toBe(status);
      });
    });
  });

  describe('Product type', () => {
    it('should create a valid Product object', () => {
      const product: Product = {
        id: 1,
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones',
        price: 199.99,
        category: 'Electronics',
        stock: 45,
        sku: 'WH-001',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(product.id).toBe(1);
      expect(product.name).toBe('Wireless Headphones');
      expect(product.price).toBe(199.99);
      expect(product.category).toBe('Electronics');
      expect(product.stock).toBe(45);
    });
  });

  describe('Auth types', () => {
    it('should create valid JwtKeys', () => {
      const jwtKeys: JwtKeys = {
        access_token: 'access_token_here',
        refresh_token: 'refresh_token_here'
      };

      expect(jwtKeys.access_token).toBe('access_token_here');
      expect(jwtKeys.refresh_token).toBe('refresh_token_here');
    });
  });

  describe('API Response types', () => {
    it('should create a generic ApiResponse', () => {
      const response: ApiResponse<string> = {
        data: 'test data',
        message: 'Success',
        success: true
      };

      expect(response.data).toBe('test data');
      expect(response.success).toBe(true);
    });

    it('should create a PaginatedResponse', () => {
      const paginated: PaginatedResponse<User> = {
        data: [
          { id: 1, username: 'user1', password: 'pass1' },
          { id: 2, username: 'user2', password: 'pass2' }
        ],
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1
      };

      expect(paginated.data.length).toBe(2);
      expect(paginated.total).toBe(2);
      expect(paginated.page).toBe(1);
      expect(paginated.totalPages).toBe(1);
    });
  });
});
