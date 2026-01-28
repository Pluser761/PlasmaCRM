import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '@plasma-crm/shared-types';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, PageHeaderComponent, DataTableComponent],
  template: `
    <app-page-header
      title="Orders"
      description="Track and manage customer orders"
      createButtonText="Create Order"
      createButtonIcon="📋"
      (createClick)="onCreateOrder()"
    ></app-page-header>

    <div class="page-content">
      <app-data-table
        [data]="orders"
        [columns]="orderColumns"
        [actions]="orderActions"
        emptyMessage="No orders found"
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
    
    ::ng-deep {
  
      .status-badge {
        display: inline-flex;
        align-items: center;
        padding: 0.25rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
  
      .status-pending {
        background-color: #fef3c7;
        color: #d97706;
      }
  
      .status-confirmed {
        background-color: #dbeafe;
        color: #2563eb;
      }
  
      .status-processing {
        background-color: #ede9fe;
        color: #7c3aed;
      }
  
      .status-shipped {
        background-color: #cffafe;
        color: #0891b2;
      }
  
      .status-delivered {
        background-color: #d1fae5;
        color: #059669;
      }
  
      .status-cancelled {
        background-color: #fee2e2;
        color: #dc2626;
      }
  
      .status-default {
        background-color: #f3f4f6;
        color: #6b7280;
      }

    }
  `]
})
export default class Orders implements OnInit {
  private http = inject(HttpClient);

  orders: Order[] = [];
  loading = false;

  orderColumns: TableColumn<Order>[] = [
    {
      key: 'orderNumber',
      label: 'Order #',
    },
    {
      key: 'customerName',
      label: 'Customer',
    },
    {
      key: 'status',
      label: 'Status',
      format: value => this.formatStatus(value),
    },
    {
      key: 'total',
      label: 'Total',
      format: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: 'orderDate',
      label: 'Order Date',
      format: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'expectedDeliveryDate',
      label: 'Expected Delivery',
      format: (value: Date | undefined) => value ? new Date(value).toLocaleDateString() : 'N/A',
    },
  ];

  orderActions: TableAction<Order>[] = [
    {
      label: 'View',
      class: 'btn btn-outline',
      action: (order) => this.onViewOrder(order),
    },
    {
      label: 'Edit',
      class: 'btn btn-outline',
      action: (order) => this.onEditOrder(order),
    },
    {
      label: 'Delete',
      class: 'btn btn-secondary',
      action: (order) => this.onDeleteOrder(order),
    },
  ];

  ngOnInit(): void {
    this.loadOrders();
  }

  formatStatus(status: string): string {
    const statusClasses: Record<string, string> = {
      'pending': 'status-badge status-pending',
      'confirmed': 'status-badge status-confirmed',
      'processing': 'status-badge status-processing',
      'shipped': 'status-badge status-shipped',
      'delivered': 'status-badge status-delivered',
      'cancelled': 'status-badge status-cancelled',
    };

    const displayText = status.charAt(0).toUpperCase() + status.slice(1);
    const cssClass = statusClasses[status] || 'status-badge status-default';

    return `<span class="${cssClass}">${displayText}</span>`;
  }

  loadOrders(): void {
    this.loading = true;
    this.http.get<Order[]>('/api/orders').subscribe({
      next: (orders) => {
        this.orders = orders.map(order => ({
          ...order,
          statusDisplay: this.formatStatus(order.status)
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.loading = false;
        // For now, show mock data if API fails
        this.loadMockData();
      }
    });
  }

  loadMockData(): void {
    const mockOrders: Order[] = [
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
        ],
        subtotal: 1299.99,
        tax: 103.99,
        total: 1403.98,
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
            id: 2,
            productName: 'Office Chair',
            quantity: 1,
            unitPrice: 299.99,
            totalPrice: 299.99,
          },
        ],
        subtotal: 299.99,
        tax: 24.00,
        total: 323.99,
        orderDate: new Date('2024-01-20'),
        expectedDeliveryDate: new Date('2024-01-27'),
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-25'),
      },
    ];

    this.orders = mockOrders;
  }

  onCreateOrder(): void {
    console.log('Create new order');
    // TODO: Open create order modal/form
  }

  onViewOrder(order: Order): void {
    console.log('View order:', order);
    // TODO: Open order details modal/page
  }

  onEditOrder(order: Order): void {
    console.log('Edit order:', order);
    // TODO: Open edit order modal/form
  }

  onDeleteOrder(order: Order): void {
    if (confirm(`Are you sure you want to delete order ${order.orderNumber}?`)) {
      console.log('Delete order:', order);
      // TODO: Call delete API
    }
  }

}