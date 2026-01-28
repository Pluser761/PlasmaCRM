import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { Product } from '@plasma-crm/shared-types/product';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  @Inject()
  private productService: ProductService;

  @Get()
  async findAll(@Query('category') category?: string): Promise<Product[]> {
    if (category) {
      return this.productService.findByCategory(category);
    }
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Post()
  async create(@Body() productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.productService.create(productData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product> {
    return this.productService.update(+id, productData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(+id);
  }
}