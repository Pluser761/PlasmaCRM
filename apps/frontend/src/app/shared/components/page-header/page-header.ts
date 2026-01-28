import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">{{ title }}</h1>
          @if (description) {
            <p class="page-description">{{ description }}</p>
          }
        </div>
        @if (showCreateButton || customActions.length > 0) {
          <div class="header-actions">
            @for (action of customActions; track action.label) {
              <button
                [class]="action.class || 'btn btn-secondary'"
                (click)="action.action()"
              >
                {{ action.label }}
              </button>
            }
            @if (showCreateButton) {
              <button
                class="btn btn-primary"
                (click)="onCreateClick()"
              >
                @if (createButtonIcon) {
                  <span class="btn-icon">{{ createButtonIcon }}</span>
                }
                {{ createButtonText }}
              </button>
            }
          </div>
        }
      </div>
      @if (metaInfo) {
        <div class="header-meta">
          <span class="meta-item">{{ metaInfo }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .header-text {
      flex: 1;
    }

    .page-title {
      margin: 0 0 0.5rem 0;
      color: var(--text-primary);
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .page-description {
      margin: 0;
      color: var(--text-secondary);
      font-size: 1rem;
      line-height: 1.5;
      max-width: 600px;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      flex-shrink: 0;
    }

    .header-meta {
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid #f3f4f6;
    }

    .meta-item {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: 1px solid transparent;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      white-space: nowrap;

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      &.btn-primary {
        background-color: var(--primary-color, #3b82f6);
        color: white;
        border-color: var(--primary-color, #3b82f6);

        &:hover {
          background-color: var(--primary-dark, #2563eb);
          border-color: var(--primary-dark, #2563eb);
        }

        &:active {
          background-color: var(--primary-darker, #1d4ed8);
          border-color: var(--primary-darker, #1d4ed8);
        }
      }

      &.btn-secondary {
        background-color: white;
        color: var(--text-primary, #111827);
        border-color: #d1d5db;

        &:hover {
          background-color: #f9fafb;
          border-color: #9ca3af;
        }

        &:active {
          background-color: #f3f4f6;
        }
      }

      &.btn-outline {
        background-color: transparent;
        color: var(--primary-color, #3b82f6);
        border-color: var(--primary-color, #3b82f6);

        &:hover {
          background-color: var(--primary-color, #3b82f6);
          color: white;
        }
      }
    }

    .btn-icon {
      font-size: 1rem;
      line-height: 1;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .header-actions {
        justify-content: flex-start;
        flex-wrap: wrap;
      }

      .page-title {
        font-size: 1.5rem;
      }

      .btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.8125rem;
      }
    }

    @media (max-width: 480px) {
      .header-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .btn {
        justify-content: center;
        width: 100%;
      }
    }
  `]
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() showCreateButton = true;
  @Input() createButtonText = 'Create New';
  @Input() createButtonIcon = '';
  @Input() metaInfo = '';
  @Input() customActions: { label: string; action: () => void; class?: string }[] = [];

  @Output() createClick = new EventEmitter<void>();

  onCreateClick(): void {
    this.createClick.emit();
  }
}