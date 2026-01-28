import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { Customer } from '@plasma-crm/shared-types/customer';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  @Inject()
  private customerService: CustomerService;

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Post()
  async create(@Body() customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() customerData: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Customer> {
    return this.customerService.update(+id, customerData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.customerService.delete(+id);
  }
}