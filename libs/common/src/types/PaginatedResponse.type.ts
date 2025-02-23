export type PaginatedResponse<T> = {
  recipes: T[];
  pagination: {
    totalRecipes: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};
