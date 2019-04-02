import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { ConfirmModalData } from '../../../modals/ixo-confirm-modal/confirm-modal-data.interface';
import { IxoConfirmModalComponent } from '../../../modals/ixo-confirm-modal/ixo-confirm-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigService } from '../../../services/config.service';
import { RxService } from '../../../services/rx.service';

@Component({
  templateUrl: './page-edit.component.html',
})
export class PageEditComponent extends ViewAbstractComponent implements OnInit {

  versionIndex$: Promise<any>;
  versionData$: Promise<any>;
  data$: Promise<any>;

  id: string;

  versionForm: FormGroup = new FormGroup({});
  versionFields: FormlyFieldConfig[];

  navigationForm: FormGroup = new FormGroup({});

  navigationOptions: any[];
  selectedNavigationOptions: any[];

  hasChildren = true;

  currentPageVersion: string = null;

  pageData: { id: string, name: string, publishedFrom: string, publishedUntil: string, slug: string, online: boolean };

  versionSaving = true;
  pageDataSaving = false;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected config: ConfigService,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected schemaTransform: SchemaTransformService,
              protected modal: BsModalService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.loadDetailData();
      this.updateVersionIndex();
    });
  }

  get previewUrl() {
    return this.config.config['cms']['preview'];
  }

  private updateVersionIndex() {
    this.versionIndex$ = this.appData.pageVersionIndex(this.id);
  }

  private loadDetailData() {
    this.data$ = this.appData.getPageDetail(this.id).then((data) => {
      this.pageData = {
        id: data.page.page.id,
        name: data.page.page.name,
        publishedFrom: data.page.page.publishedFrom,
        publishedUntil: data.page.page.publishedUntil,
        slug: data.page.page.slug,
        online: data.page.page.status === 'online',
      };

      if (this.currentPageVersion !== data.page.version.head) {
        this.currentPageVersion = data.page.version.head;
        data.schema = this.schemaTransform.transformForm(data.schema);
        this.versionFields = data.schema ? data.schema : [];
        this.loadNavigationData(data.navigation);
        this.hasChildren = data.hasChildren;
        this.versionData$ = this.appData.getPageVersionDetail(this.id, data.page.version.head).then((versionData) => {
          this.versionSaving = false;
          return versionData;
        }).catch(() => this.versionSaving = false);
      }
      return data;
    }).catch(() => this.versionSaving = false);
  }

  private loadNavigationData(navigation) {
    this.navigationOptions = navigation;
    this.selectedNavigationOptions = navigation.filter((element) => element.active).map((element) => element.name);
  }

  onReplaceContentModal(fromPage) {
    console.log(fromPage);
  }

  onSubmit(): void {
    if (this.versionForm.valid === false) {
      this.notification.formErrors(this.versionForm);
    } else {
      this.versionSaving = true;
      const data = this.versionForm.getRawValue();
      this.appData.createPageVersion(this.id, {content: data}).then((response) => {
        this.loadDetailData();
        this.updateVersionIndex();
        this.notification.success('Page Version successfully created', 'Success');
      }).catch((error) => this.notification.apiError(error));
    }
  }

  doDelete(): void {
    if (this.hasChildren) {
      this.notification.error('You can\'t delete a page having child pages', 'Error');
      return;
    }
    const initialState: ConfirmModalData = {
      title: 'Delete this Page?',
      text: 'Do you really want to delete this Page?',
      onConfirm: () => {
        this.appData.pageDelete(this.id).then(() => {
          this.notification.success('Page successfully deleted', 'Success');
          this.router.navigateByUrl('/page');
        }).catch((error) => this.notification.apiError(error));
      },
    };
    this.modal.show(IxoConfirmModalComponent, {initialState});
  }

  savePageData(key: string, value: any) {
    this.pageDataSaving = true;
    const postData = {};
    postData[key] = value;
    this.appData.updatePage(this.id, postData).then((response) => {
      this.loadDetailData();
      this.pageDataSaving = false;
      this.notification.success(key + ' successfully saved', 'Success');
    }).catch((error) => {
      this.notification.apiError(error);
      this.pageDataSaving = false;
    });
  }

  openPreview() {
    this.data$.then((data) => {
      window.open(data.page.url);
    });
  }
}
