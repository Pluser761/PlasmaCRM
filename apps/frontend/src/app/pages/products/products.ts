import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table';

// Define Product interface since it's not in shared types yet
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule, PageHeaderComponent, DataTableComponent],
  template: `
    <app-page-header
      title="Products"
      description="Manage your product catalog, pricing, and inventory"
      createButtonText="Add Product"
      createButtonIcon="📦"
      (createClick)="onCreateProduct()"
    ></app-page-header>

    <div class="page-content">
      <app-data-table
        [data]="products"
        [columns]="productColumns"
        [actions]="productActions"
        emptyMessage="No products found"
      ></app-data-table>
    </div>
  `,
  styles: [`
    .page-content {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }
  `]
})
export default class Products implements OnInit {
  products: Product[] = [];

  productColumns: TableColumn<Product>[] = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'sku',
      label: 'SKU',
    },
    {
      key: 'category',
      label: 'Category',
    },
    {
      key: 'price',
      label: 'Price',
      format: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: 'stock',
      label: 'Stock',
    },
    {
      key: 'createdAt',
      label: 'Created',
      format: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  productActions: TableAction<Product>[] = [
    {
      label: 'Edit',
      class: 'btn btn-outline',
      action: (product) => this.onEditProduct(product),
    },
    {
      label: 'Delete',
      class: 'btn btn-secondary',
      action: (product) => this.onDeleteProduct(product),
    },
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Mock data for now - replace with API call when backend is ready
    this.products = [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
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
        description: 'Comfortable office chair with lumbar support',
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
        description: '32-inch 4K monitor with HDR support',
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
  }

  onCreateProduct(): void {
    console.log('Create new product');
    // TODO: Open create product modal/form
  }

  onEditProduct(product: Product): void {
    console.log('Edit product:', product);
    // TODO: Open edit product modal/form
  }

  onDeleteProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      console.log('Delete product:', product);
      // TODO: Call delete API
    }
  }

}