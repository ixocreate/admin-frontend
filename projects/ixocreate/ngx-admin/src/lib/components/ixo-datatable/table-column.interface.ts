import { TemplateRef } from '@angular/core';
import { DataTableTypesSearchElement } from '../../services/data-table-types.service';

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
  sortable?: boolean;
  searchable?: boolean;
  searchElement?: DataTableTypesSearchElement;
}
