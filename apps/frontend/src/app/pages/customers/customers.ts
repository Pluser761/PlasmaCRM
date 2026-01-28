import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '@plasma-crm/shared-types/customer';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, PageHeaderComponent, DataTableComponent],
  template: `
    <app-page-header
      title="Customers"
      description="Manage your customer relationships and track interactions"
      createButtonText="Add Customer"
      createButtonIcon="👥"
      (createClick)="onCreateCustomer()"
    ></app-page-header>

    <div class="page-content">
      <app-data-table
        [data]="customers"
        [columns]="customerColumns"
        [actions]="customerActions"
        emptyMessage="No customers found"
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
export default class Customers implements OnInit {
  private http = inject(HttpClient);

  customers: Customer[] = [];
  loading = false;

  customerColumns: TableColumn<Customer>[] = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'city',
      label: 'City',
    },
    {
      key: 'country',
      label: 'Country',
    },
    {
      key: 'createdAt',
      label: 'Created',
      format: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  customerActions: TableAction<Customer>[] = [
    {
      label: 'Edit',
      class: 'btn btn-outline',
      action: (customer) => this.onEditCustomer(customer),
    },
    {
      label: 'Delete',
      class: 'btn btn-secondary',
      action: (customer) => this.onDeleteCustomer(customer),
    },
  ];

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.http.get<Customer[]>('/api/customers').subscribe({
      next: (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.loading = false;
      }
    });
  }

  onCreateCustomer(): void {
    console.log('Create new customer');
    // TODO: Open create customer modal/form
  }

  onEditCustomer(customer: Customer): void {
    console.log('Edit customer:', customer);
    // TODO: Open edit customer modal/form
  }

  onDeleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      console.log('Delete customer:', customer);
      // TODO: Call delete API
    }
  }

}