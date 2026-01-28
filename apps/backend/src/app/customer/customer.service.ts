import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '@plasma-crm/shared-types';

@Injectable()
export class CustomerService {
  private readonly customers: Customer[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      address: '123 Main St',
      city: 'New York',
      country: 'USA',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-0456',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      country: 'USA',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1-555-0789',
      address: '789 Pine Rd',
      city: 'Chicago',
      country: 'USA',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      phone: '+1-555-0321',
      address: '321 Elm St',
      city: 'Houston',
      country: 'USA',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie.wilson@example.com',
      phone: '+1-555-0654',
      address: '654 Maple Dr',
      city: 'Phoenix',
      country: 'USA',
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-05'),
    },
  ];

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async findOne(id: number): Promise<Customer> {
    const customer = this.customers.find(customer => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async create(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    const newCustomer: Customer = {
      id: Math.max(...this.customers.map(c => c.id)) + 1,
      ...customerData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  async update(id: number, customerData: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Customer> {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...customerData,
      updatedAt: new Date(),
    };

    return this.customers[customerIndex];
  }

  async delete(id: number): Promise<void> {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    this.customers.splice(customerIndex, 1);
  }
}