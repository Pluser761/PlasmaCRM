import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
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

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .dashboard-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .card-icon {
        font-size: 2.5rem;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--active-bg);
        border-radius: 0.5rem;
      }

      .card-content {
        flex: 1;

        h3 {
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 600;
        }

        .card-number {
          margin: 0 0 0.25rem 0;
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .card-description {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
      }
    }

    .recent-activity {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

      h3 {
        margin: 0 0 1rem 0;
        color: var(--text-primary);
        font-size: 1.25rem;
        font-weight: 600;
      }

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .activity-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background-color: #f9fafb;
        border-radius: 0.375rem;

        .activity-icon {
          font-size: 1.25rem;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          border-radius: 50%;
        }

        .activity-content {
          flex: 1;

          p {
            margin: 0 0 0.25rem 0;
            color: var(--text-primary);
            font-weight: 500;
          }

          .activity-time {
            color: var(--text-secondary);
            font-size: 0.875rem;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .dashboard-card {
        padding: 1rem;

        .card-icon {
          width: 50px;
          height: 50px;
          font-size: 2rem;
        }

        .card-content .card-number {
          font-size: 1.5rem;
        }
      }
    }
  `]
})
export default class Home {}
