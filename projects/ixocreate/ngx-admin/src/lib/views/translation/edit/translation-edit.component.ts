import { Component, OnInit } from '@angular/core';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from '../../../services/data/app-data.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  templateUrl: './translation-edit.component.html',
})
export class TranslationEditComponent extends ViewAbstractComponent implements OnInit {

  data$: Promise<any>;
  catalogueId: string;
  definitionId: string;
  loading = false;

  constructor(private route: ActivatedRoute,
              private appData: AppDataService,
              private notification: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catalogueId = params.catalogue;
      this.definitionId = params.id;
      this.data$ = this.appData.getTranslationDetail(this.catalogueId, this.definitionId);
    });
  }

  saveTranslation(data) {
    this.loading = true;
    this.appData.saveTranslation(data.locale, this.definitionId, data.id, data.message).then(() => {
      this.loading = false;
      this.notification.success('Translation saved!', 'Success');
    }).catch((error) => {
      this.loading = false;
      this.notification.apiError(error);
    });
  }

}
