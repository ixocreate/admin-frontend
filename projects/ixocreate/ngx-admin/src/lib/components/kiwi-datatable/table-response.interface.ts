export interface TableResponse<T> {
  label: string;
  count: number;
  limit: number;
  offset: number;
  orderBy: string;
  orderDirection: 'DESC' | 'ASC';
  search: string;
  result: T[];
}
