import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';

@Component({
  templateUrl: './page-create.component.html',
})
export class PageCreateComponent extends ViewAbstractComponent implements OnInit {

  locale: string;
  parentSitemapId: string;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected schemaTransform: SchemaTransformService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.locale = params.locale;
      this.parentSitemapId = params.parentSitemapId;

      this.appData.pageAvailablePageTypes(this.parentSitemapId).then((response) => {
        this.fields = [
          {
            key: 'pageType',
            type: 'select',
            templateOptions: {
              label: 'PageType',
              valueProp: 'name',
              options: response,
              required: true,
            },
          },
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              label: 'Name',
              required: true,
            },
          },
        ];
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      const data = this.form.getRawValue();
      this.appData.pageCreate(data.name, data.pageType, this.locale, this.parentSitemapId).then((response) => {
        this.notification.success('Page successfully created', 'Success');
        this.router.navigateByUrl(this.getRedirectUrl(response));
      }).catch((error) => this.notification.apiError(error));
    }
  }

  getRedirectUrl(response) {
    return '/page/' + response + '/edit';
  }
}
