import { Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { TableColumnData } from './table-column.interface';
import { TableResponse } from './table-response.interface';
import { ConfigService } from '../../services/config.service';
import { ResourceConfig } from '../../interfaces/config.interface';
import { DataTableTypesService } from '../../services/data-table-types.service';

@Component({
  selector: 'kiwi-datatable',
  templateUrl: 'kiwi-datatable.component.html',
})
export class KiwiDatatableComponent implements OnInit {

  static TYPE_EDIT = 'edit';
  static TYPE_SELECT = 'select';

  @Input() tableTitle = null;
  @Input() apiUrl = null;

  @Input() resource = null;
  @Input() advancedSearch = false;
  @Input() filters: { [key: string]: string } = {};
  @Input() search = '';
  @Input() type = KiwiDatatableComponent.TYPE_EDIT;
  resourceInfo: ResourceConfig;

  @Output() updatedData = new EventEmitter<any>();

  @Input() selectedElements: string[] = [];
  @Output() select = new EventEmitter<any>();
  @Output() deSelect = new EventEmitter<any>();

  @Input('columns') set columnsTemp(columns: Array<any>) {
    this.setColumns(columns);
  }

  @Input() limit = 10;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('collapseColumnTemplate') collapseColumnTemplate: TemplateRef<any>;

  @ViewChild('buttonColumnTemplate') buttonColumnTemplate: TemplateRef<any>;

  data: TableResponse<any> = null;
  hostColumns: Array<TableColumnData<any>> = [];
  tableColumns: Array<TableColumnData<any>> = [];
  detailColumns: Array<TableColumnData<any>> = [];
  loading = false;
  pageNumber = 0;
  searchableData: { [key: string]: boolean } = {};

  private orderBy: string = null;
  private orderDirection: 'DESC' | 'ASC' = null;

  private inputTimeout = null;

  private minSizes = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    always: 20000,
  };

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.calculateColumns();
  }

  constructor(protected api: ApiService,
              protected config: ConfigService,
              protected notification: NotificationService,
              protected dataTableTypes: DataTableTypesService) {
  }

  ngOnInit() {
    if (this.resource) {
      this.apiUrl = this.config.config.routes.resourceIndex.replace('{resource}', this.resource);
      this.resourceInfo = this.config.getResourceConfig(this.resource);
    }
    if (this.apiUrl) {
      this.updateElements();
    }
  }

  private setColumns(columns: Array<any>) {
    for (const column of columns) {
      this.searchableData[column.prop] = !!column.searchable;
      column.headerClass = column.headerClass || '';
      column.cellClass = column.cellClass || '';

      if (column.type) {
        const typeRender = this.dataTableTypes.getType(column.type);
        if (typeRender) {
          const typeOptions = typeRender(column.options);
          if (typeOptions.align) {
            column.align = typeOptions.align;
          }
          if (typeOptions.width) {
            column.width = typeOptions.width;
          }
          if (typeOptions.searchElement) {
            column.searchElement = typeOptions.searchElement;
          }
          column.render = (value) => {
            return typeOptions.render(value);
          };
        }
        delete column.type;
      }

      if (column.align) {
        // column.headerClass += ' text-' + column.align;
        column.cellClass += ' text-' + column.align;
        // column.inputClass = 'text-' + column.align;
        delete column.align;
      }

    }
    this.hostColumns = columns;
    this.calculateColumns();
  }

  private calculateColumns() {
    const windowWidth = window.innerWidth;
    const tableColumns = [];
    const detailColumns = [];
    for (const column of this.hostColumns) {
      if (column.moveToDetailBelow) {
        const belowWidth = this.minSizes[column.moveToDetailBelow];
        if (windowWidth > belowWidth) {
          tableColumns.push(column);
        } else {
          detailColumns.push(column);
        }
      } else {
        tableColumns.push(column);
      }
    }
    this.tableColumns = tableColumns;
    this.detailColumns = detailColumns;
  }

  private ceil(value: number) {
    return Math.ceil(value);
  }

  private parseParams(data) {
    return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
  }

  updateElements() {
    const params: any = {
      offset: this.pageNumber * this.limit,
      limit: this.limit,
    };

    if (this.orderBy && this.orderDirection) {
      params.orderBy = this.orderBy;
      params.orderDirection = this.orderDirection;
    }

    if (this.advancedSearch) {
      for (const key of Object.keys(this.filters)) {
        if (this.filters.hasOwnProperty(key)) {
          const value = this.filters[key];
          if (value && value !== '') {
            params['filter[' + key + ']'] = this.filters[key];
          }
        }
      }
    } else {
      if (this.search && this.search !== '') {
        params.search = this.search;
      }
    }

    this.loading = true;
    return this.api.get(this.apiUrl + '?' + this.parseParams(params)).then((data: any) => {
      if (this.tableTitle === null && data.label) {
        this.tableTitle = data.label;
      }

      let schema = null;
      if (this.resourceInfo) {
        schema = this.resourceInfo.listSchema;
      } else if (data.schema) {
        schema = data.schema;
      }

      if (this.hostColumns.length === 0 && schema) {
        const columns = schema.elements.map((element) => {
          return {
            name: element.label,
            prop: element.name,
            type: element.type,
            sortable: element.sortable,
            searchable: element.searchable,
            options: element.options,
          };
        });
        columns.push({
          cellTemplate: this.buttonColumnTemplate,
        });
        this.setColumns(columns);
      }

      if (data.items) {
        this.data = {
          label: data.label,
          count: data.meta.count,
          limit: this.limit,
          offset: params.offset,
          search: params.search,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection,
          result: data.items,
        };
      } else {
        // TODO: Update
        this.data = {
          label: '',
          count: 1000,
          limit: this.limit,
          offset: params.offset,
          search: params.search,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection,
          result: data,
        };
      }
      this.updatedData.emit(this.data);
    })
      .catch(error => {
        this.notification.apiError(error);
      })
      .then(() => {
        this.loading = false;
      });
  }

  setPage(pageInfo) {
    this.pageNumber = pageInfo.offset;
    this.updateElements();
  }

  onSort(event) {
    this.pageNumber = 0;
    this.orderBy = event.sorts[0].prop;
    this.orderDirection = event.sorts[0].dir;
    this.updateElements();
  }

  applyFilter() {
    if (this.inputTimeout) {
      clearTimeout(this.inputTimeout);
    }
    this.inputTimeout = setTimeout(() => {
      this.pageNumber = 0;
      this.updateElements();
    }, 500);
  }

  private gotToFirstPage() {
    if (this.table) {
      this.table.offset = 0;
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  doAdvancedSearch(event, column) {
    this.filters[column.prop] = event.target.value;
    this.applyFilter();
  }

  isSelected(element): boolean {
    return this.selectedElements.indexOf(element) > -1;
  }

  onSelect(row) {
    this.select.emit(row);
  }

  onDeSelect(row) {
    this.deSelect.emit(row);
  }
}
