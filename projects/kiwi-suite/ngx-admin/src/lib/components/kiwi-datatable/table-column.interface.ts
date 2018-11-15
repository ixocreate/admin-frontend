import { TemplateRef } from '@angular/core';
import { TableColumnType } from './table-column-type.enum';

export interface TableColumnData<T> {
  name?: string;
  prop?: keyof T;
  width?: number;
  align?: 'left' | 'right' | 'center';
  type?: string;
  render?: (value, row) => {};
  cellTemplate?: TemplateRef<any>;
  moveToDetailBelow?: 'xs' | 'sm' | 'md' | 'lg' | 'always';
  headerClass?: string;
  cellClass?: string;
  canAutoResize?: boolean;
}
