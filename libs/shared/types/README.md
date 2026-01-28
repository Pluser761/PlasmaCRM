# Shared Types Library

This library contains shared TypeScript types and interfaces used across the PlasmaCRM applications (frontend and backend).

## Types Included

### Core Entity Types
- `User` - User authentication data
- `Customer` - Customer information
- `Order` - Order data with items and status
- `OrderItem` - Individual order line items
- `OrderStatus` - Union type for order status values

### Authentication Types
- `JwtKeys` - JWT token response structure

### API Types
- `ApiResponse<T>` - Generic API response wrapper
- `PaginatedResponse<T>` - Paginated API response structure

## Usage

```typescript
// Import from backend services
import { Customer, Order, OrderItem } from '@plasma-crm/shared-types';

// Import from frontend components
import { Customer, OrderStatus } from '@plasma-crm/shared-types';
```

## Building

Run `nx build types` to build the library.

## Running unit tests

Run `nx test types` to execute the unit tests via [Jest](https://jestjs.io).
