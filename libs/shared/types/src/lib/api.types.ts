// API Response types
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

// Pagination types
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};