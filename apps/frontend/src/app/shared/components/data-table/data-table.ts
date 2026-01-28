import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn<T extends { id: string | number}> {
  key: keyof T;
  label: string;
  width?: string;
  format?: (value: any, item: T) => string;
}

export interface TableAction<T extends { id: string | number}> {
  label: string;
  icon?: string;
  class?: string;
  action: (item: T) => void;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="data-table-container">

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
          <tr>
            @for (column of columns; track column.key) {
              <th [style.width]="column.width">
                {{ column.label }}
              </th>
            }
            @if (actions.length > 0) {
              <th class="actions-column">Actions</th>
            }
          </tr>
          </thead>
          <tbody>
            @for (item of data; track item.id || $index) {
              <tr class="data-row">
                @for (column of columns; track column.key) {
                  <td [innerHTML]="getCellValue(item, column)"></td>
                }
                @if (actions.length > 0) {
                  <td class="actions-column">
                    <div class="action-buttons">
                      @for (action of actions; track action.label) {
                        <button
                          [class]="action.class || 'btn btn-sm'"
                          (click)="action.action(item)"
                          [title]="action.label"
                        >
                          {{ action.label }}
                        </button>
                      }
                    </div>
                  </td>
                }
              </tr>
            }
            @if (data.length === 0) {
              <tr class="empty-row">
                <td
                  [attr.colspan]="columns.length + (actions.length > 0 ? 1 : 0)"
                  class="empty-message"
                >
                  {{ emptyMessage }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .data-table-container {
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }


      .table-wrapper {
        overflow-x: auto;
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
      }

      .data-table thead th {
        background: #f9fafb;
        padding: 0.75rem 1rem;
        text-align: left;
        font-weight: 600;
        color: var(--text-primary);
        border-bottom: 1px solid #e5e7eb;
        white-space: nowrap;
      }


      .data-table tbody td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #f3f4f6;
        color: var(--text-primary);
        vertical-align: top;
      }

      .data-row:hover {
        background: #f9fafb;
      }

      .actions-column {
        width: 1px;
        white-space: nowrap;
      }

      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }

      .empty-row {
        background: #fafafa;
      }

      .empty-message {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--text-secondary);
        font-style: italic;
      }
      
    `,
  ],
})
export class DataTableComponent<T extends { id: string | number}> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() actions: TableAction<T>[] = [];
  @Input() emptyMessage = 'No data available';

  getCellValue(item: T, column: TableColumn<T>): string {
    const value = item[column.key];
    if (column.format) {
      return column.format(value, item);
    }
    return String(value || '');
  }
}