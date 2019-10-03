import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { TableColumnData } from '../../../components/ixo-datatable/table-column.interface';
import { ActivatedRoute } from '@angular/router';
import { TableResponse } from '../../../components/ixo-datatable/table-response.interface';
import { ConfigService } from '../../../services/config.service';

@Component({
  templateUrl: './translation-list.component.html',
})
export class TranslationListComponent extends ViewAbstractComponent implements OnInit {

  @ViewChild('buttonColumnTemplate') buttonColumnTemplate: TemplateRef<any>;

  catalogueId: string;
  dataUrl: string;
  columns: Array<TableColumnData<any>> = [];
  oldColumns: Array<TableColumnData<any>> = [];

  constructor(private route: ActivatedRoute, private config: ConfigService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.catalogueId = params.catalogue;
      this.dataUrl = this.config.config.routes.translationIndex.replace('{catalogue}', this.catalogueId);
    });
  }

  setColumns(data: TableResponse<any>) {
    const columns: Array<TableColumnData<any>> = [
      {
        name: 'Name',
        prop: 'name',
        type: 'string'
      },
    ];

    if (data.result[0]) {
      const firstResult = data.result[0];
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

    let update = false;

    if (JSON.stringify(this.oldColumns) !== JSON.stringify(columns)) {
      this.oldColumns = JSON.parse(JSON.stringify(columns));
      update = true;
    }

    columns.push({
      cellTemplate: this.buttonColumnTemplate,
    });

    if (update) {
      this.columns = columns;
    }
  }

}
