import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table';
import { Customer } from '@plasma-crm/shared-types/customer';
import { Product } from '@plasma-crm/shared-types/product';
import { HttpClient } from '@angular/common/http';

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
  private http = inject(HttpClient);

  products: Product[] = [];
  loading = false;

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
    this.loading = true;
    this.http.get<Product[]>('/api/products').subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
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