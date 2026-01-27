import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  template: `
    <div class="page-header">
      <h2>Settings</h2>
      <p>Configure your CRM preferences</p>
    </div>

    <div class="page-content">
      <div class="placeholder-content">
        <h3>System Settings</h3>
        <p>Manage user permissions, system preferences, integrations, and application settings.</p>
        <div class="placeholder-actions">
          <button class="btn btn-primary">System Settings</button>
          <button class="btn btn-secondary">User Management</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;

      h2 {
        margin: 0 0 0.5rem 0;
        color: var(--text-primary);
        font-size: 1.875rem;
        font-weight: 700;
      }

      p {
        margin: 0;
        color: var(--text-secondary);
      }
    }

    .page-content {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }

    .placeholder-content {
      text-align: center;

      h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
      }

      p {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    .placeholder-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &.btn-primary {
        background-color: var(--primary-color);
        color: white;

        &:hover {
          background-color: var(--primary-dark);
        }
      }

      &.btn-secondary {
        background-color: #f3f4f6;
        color: var(--text-primary);

        &:hover {
          background-color: #e5e7eb;
        }
      }
    }
  `]
})
export default class Settings {}