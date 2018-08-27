import { Component, Input, OnInit } from '@angular/core';
import { AppDataService } from '../../services/data/app-data.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { SchemaTransformService } from '../../services/schema-transform.service';

@Component({
  selector: 'kiwi-page-version-edit',
  templateUrl: './kiwi-page-version-edit.component.html',
})
export class KiwiPageVersionEditComponent implements OnInit {

  @Input() private id: string;

  data$: Promise<any>;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(private appData: AppDataService,
              private schemaTransformService: SchemaTransformService) {
  }

  ngOnInit() {
    this.data$ = this.appData.getPageVersionDetail(this.id).then((data) => {
      data.schema = this.schemaTransformService.transformForm(data.schema);
      this.fields = data.schema ? data.schema : [];
      return data;
    });
  }

}
