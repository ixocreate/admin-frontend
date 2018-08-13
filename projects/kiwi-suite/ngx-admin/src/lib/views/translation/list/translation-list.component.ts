import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { TableColumnData } from '../../../components/kiwi-datatable/table-column.interface';
import { AppDataService } from '../../../services/data/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { TableResponse } from '../../../components/kiwi-datatable/table-response.interface';

@Component({
  templateUrl: './translation-list.component.html',
})
export class TranslationListComponent extends ViewAbstractComponent implements OnInit {

  @ViewChild('buttonColumnTemplate') buttonColumnTemplate: TemplateRef<any>;

  catalogueId: string;
  dataUrl: string;
  columns: Array<TableColumnData<any>> = [];

  constructor(private route: ActivatedRoute, private appData: AppDataService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.catalogueId = params.catalogue;
      this.dataUrl = this.appData.config.routes.translationIndex.replace('{catalogue}', this.catalogueId);
    });


  }

  setColumns(data: TableResponse<any>) {
    const columns: Array<TableColumnData<any>> = [
      {
        name: 'Name',
        prop: 'name',
      },
    ];

    if (data.result[0]) {
      const firstResult = data.result[0];
      console.log(firstResult);
      for (const key in firstResult.locales) {
        if (firstResult.locales.hasOwnProperty(key)) {
          const locale = firstResult.locales[key];
          columns.push({
            name: '<i class="flag-icon flag-icon-' + locale.country + '"></i>',
            prop: 'locales',
            align: 'center',
            moveToDetailBelow: 'sm',
            width: 50,
            render: (value) => {
              console.log(value);
              if (value[key].translated) {
                return '<i class="fa fa-check text-success"></i>';
              } else {
                return '<i class="fa fa-times text-danger"></i>';
              }
            },
          });
        }
      }
    }

    columns.push({
      cellTemplate: this.buttonColumnTemplate,
    });

    this.columns = columns;
  }

  onSearch(): void {

  }
}
