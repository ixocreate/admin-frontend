export interface TableResponse<T> {
  count: number;
  limit: number;
  offset: number;
  orderBy: string;
  orderDirection: 'DESC' | 'ASC';
  search: string;
  result: Array<T>;
}
