import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { Order } from '@plasma-crm/shared-types';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  @Inject()
  private orderService: OrderService;

  @Get()
  async findAll(@Query('customerId') customerId?: string): Promise<Order[]> {
    if (customerId) {
      return this.orderService.findByCustomer(+customerId);
    }
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @Post()
  async create(@Body() orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    return this.orderService.create(orderData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() orderData: Partial<Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>>
  ): Promise<Order> {
    return this.orderService.update(+id, orderData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.orderService.delete(+id);
  }
}