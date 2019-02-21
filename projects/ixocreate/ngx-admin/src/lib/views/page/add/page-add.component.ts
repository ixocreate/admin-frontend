import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  templateUrl: './page-add.component.html',
})
export class PageAddComponent extends ViewAbstractComponent implements OnInit {

  data$: Promise<any>;
  locale: string;
  sitemapId: string;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected appData: AppDataService,
              protected notification: NotificationService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.locale = params.locale;
      this.sitemapId = params.sitemapId;
      this.fields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Name',
            required: true,
          },
        },
      ];
    });
  }

  onSubmit(): void {
    if (this.form.valid === false) {
      this.notification.formErrors(this.form);
    } else {
      const data = this.form.getRawValue();
      this.appData.pageAdd(data.name, this.locale, this.sitemapId).then((response) => {
        this.notification.success('Page successfully added', 'Success');
        this.router.navigateByUrl(this.getRedirectUrl(response));
      }).catch((error) => this.notification.apiError(error));
    }
  }

  getRedirectUrl(response) {
    return '/page/' + response + '/edit';
  }
}
