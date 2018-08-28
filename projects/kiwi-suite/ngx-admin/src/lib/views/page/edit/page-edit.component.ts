import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';

@Component({
  templateUrl: './page-edit.component.html',
})
export class PageEditComponent extends ViewAbstractComponent implements OnInit {

  detailData$: Promise<any>;

  id: string;

  form: FormGroup = new FormGroup({});

  detailForm: FormGroup = new FormGroup({});
  detailFields: FormlyFieldConfig[];

  navigationForm: FormGroup = new FormGroup({});
  navigationModel: { navigation: Array<string> };
  navigationFields: FormlyFieldConfig[];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected schemaTransformService: SchemaTransformService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.loadDetailData();
      this.loadNavigationData();
    });
  }

  private loadDetailData() {
    this.detailData$ = this.appData.getResourceDetail('page', this.id).then((data) => {
      data.schema = this.schemaTransformService.transformForm(data.schema);
      this.detailFields = data.schema ? data.schema : [];
      return data;
    });
  }

  private loadNavigationData() {
    this.appData.pageNavigationIndex(this.id).then((data) => {
      this.navigationFields = [
        {
          wrappers: ['section'],
          templateOptions: {
            label: 'Navigation',
            icon: 'fa fa-fw fa-compass',
          },
          fieldGroup: [
            {
              key: 'navigation',
              type: 'select',
              templateOptions: {
                multiple: true,
                label: '',
                valueProp: 'name',
                options: data,
              },
            },
          ],
        },
      ];
      this.navigationModel = {
        navigation: data.filter((element) => element.active).map((element) => element.name),
      };
    });
  }

  onReplaceContentModal(fromPage) {
    console.log(fromPage);
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      console.log(this.form);
      this.notification.formErrors(this.form);
    } else {
      /*
      const data = this.form.getRawValue();
      /*
      data.locale = this.locale;
      data.parentSitemapId = this.parentSitemapId;
      this.appData.createResource('page', data).then((response) => {
        this.notification.success('Page successfully created', 'Success');
        this.router.navigateByUrl('/page/' + response.id + '/edit');
      }).catch((error) => this.notification.apiError(error));
      */
    }
  }
}
