import { Component, OnInit } from '@angular/core';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from '../../../services/data/app-data.service';
import { ConfigService } from '../../../services/config.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { TableResponse } from '../../../components/ixo-datatable/table-response.interface';
import { IxoDateTimePipe } from '../../../pipes/ixo-date-time.pipe';

@Component({
  templateUrl: './flat.component.html',
})
export class FlatComponent extends ViewAbstractComponent implements OnInit {
  handle: string;
  filterValue = '';
  pageNumber = 0;
  limit = 10;
  loading = false;
  private inputTimeout = null;
  selectedLocale: string;
  data: TableResponse<any> = null;
  parentSitemapId = null;

  private orderBy: string = null;
  private orderDirection: 'DESC' | 'ASC' = null;

  constructor(
    protected route: ActivatedRoute,
    private config: ConfigService,
    private localStorage: LocalStorageService,
    protected appData: AppDataService,
    private dateTimePipe: IxoDateTimePipe,
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.handle = params.handle;
      this.updateElements();
    });
    this.selectedLocale = this.localStorage.getItem(LocalStorageService.SELECTED_LANGUAGE, this.config.config.intl.default);
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

  get locales() {
    return this.config.config.intl.locales;
  }

  currentPage(pages) {
    return pages[this.selectedLocale] ? pages[this.selectedLocale] : null;
  }

  pageName(pages): string {
    const currentPage = this.currentPage(pages);

    if (currentPage === null) {
      const otherLanguages = [];
      for (const locale of Object.keys(pages)) {
        otherLanguages.push(locale + ': ' + pages[locale].page.name);
      }
      return '<span class="other-languages">' + otherLanguages.join(' / ') + '</span>';
    }

    let dotClass = 'text-danger';
    if (currentPage.isOnline) {
      dotClass = 'text-success';
    }
    const dot = '<span class="' + dotClass + ' mr-1"><i class="fa fa-circle"></i></span>';
    return dot + currentPage.page.name;
  }

  publishedString(currentPage) {
    if (currentPage.page.publishedFrom !== null || currentPage.page.publishedUntil !== null) {
      return this.dateTimePipe.transform(currentPage.page.publishedFrom) + ' - ' + this.dateTimePipe.transform(currentPage.page.publishedUntil);
    }
    return null;
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

  private ceil(value: number) {
    return Math.ceil(value);
  }

  updateElements() {
    const params: any = {
      offset: this.pageNumber * this.limit,
      limit: this.limit,
    };

    /*if (this.orderBy && this.orderDirection) {
      params.orderBy = this.orderBy;
      params.orderDirection = this.orderDirection;
    }*/

    if (this.filterValue && this.filterValue !== '') {
      params.search = this.filterValue;
    }

    this.loading = true;

    this.appData.getFlatPageIndex(this.handle, params).then((data: any) => {
      this.parentSitemapId = data.meta.parentSitemapId;
      this.loading = false;
      if (data.items) {
        this.data = {
          label: '',
          count: data.meta.count,
          limit: this.limit,
          offset: params.offset,
          search: params.search,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection,
          result: data.items,
        };
      }
    });

    /*
    return this.api.get(this.apiUrl + '?' + this.parseParams(params)).then((data: any) => {
      this.loading = false;

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
    });*/
  }
}
