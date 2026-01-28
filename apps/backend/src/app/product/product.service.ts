import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@plasma-crm/shared-types/product';

@Injectable()
export class ProductService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality',
      price: 199.99,
      category: 'Electronics',
      stock: 45,
      sku: 'WBH-001',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      description: 'Comfortable office chair with lumbar support and adjustable height',
      price: 299.99,
      category: 'Furniture',
      stock: 23,
      sku: 'EOC-002',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 3,
      name: 'Stainless Steel Water Bottle',
      description: 'Insulated water bottle that keeps drinks cold for 24 hours',
      price: 34.99,
      category: 'Accessories',
      stock: 67,
      sku: 'SSWB-003',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: 4,
      name: '4K Ultra HD Monitor',
      description: '32-inch 4K monitor with HDR support and ultra-thin bezels',
      price: 449.99,
      category: 'Electronics',
      stock: 12,
      sku: '4KUHD-004',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
    {
      id: 5,
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging pad compatible with all Qi devices',
      price: 39.99,
      category: 'Electronics',
      stock: 89,
      sku: 'WCP-005',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
  ];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findOne(id: number): Promise<Product> {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.products.filter(product => product.category === category);
  }

  async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const newProduct: Product = {
      id: Math.max(...this.products.map(p => p.id)) + 1,
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...productData,
      updatedAt: new Date(),
    };

    return this.products[productIndex];
  }

  async delete(id: number): Promise<void> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    this.products.splice(productIndex, 1);
  }
}