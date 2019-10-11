import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';
import { AppDataService } from '../../../services/data/app-data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../../../services/notification.service';
import { SchemaTransformService } from '../../../services/schema-transform.service';
import { ConfirmModalData } from '../../../modals/ixo-confirm-modal/ixo-confirm-modal.component.model';
import { IxoConfirmModalComponent } from '../../../modals/ixo-confirm-modal/ixo-confirm-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfigService } from '../../../services/config.service';
import { DisplayTypes, FOOTER_HEIGHT, HEADING_HEIGHT, screensInPixels } from './page-edit.component.model';
import { Observable } from 'rxjs';
import { debounceTime, take, takeWhile } from 'rxjs/operators';
import { SidebarService } from '../../../services/layout/sidebar.service';
import Split from 'split.js';

@Component({
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent extends ViewAbstractComponent implements OnInit {

  versionIndex$: Promise<any>;
  versionData: any;
  data$: Promise<any>;

  id: string;

  versionForm: FormGroup = new FormGroup({});
  versionFields: FormlyFieldConfig[];

  navigationOptions: any[];
  selectedNavigationOptions: any[];

  pageHasChildren = true;

  currentPageVersion: string;

  pageData: {
    id: string,
    name: string,
    publishedFrom: string,
    publishedUntil: string,
    slug: string,
    online: boolean,
    sitemapId: string
  };

  savingVersion = true;
  savingPageData = false;

  pageLocales: Array<{ locale: string, page: any }> = [];
  replacePageLocales: Array<{ locale: string, page: any }> = [];

  otherPagesWithPageType: Array<{ id: string, name: string }> = [];
  selectedPageWithPageType: { id: string, name: string } = null;

  iframeHeight: number;
  previewIsOpen = false;
  hideSidebarIcon = 'arrow-right';

  private formChanges: Observable<any>;
  keepPreviewOpen = false;
  private split: Split;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected config: ConfigService,
              protected appData: AppDataService,
              protected notification: NotificationService,
              protected schemaTransform: SchemaTransformService,
              protected modal: BsModalService,
              private sidebar: SidebarService) {
    super();
  }

  ngOnInit() {
    this.updateIFrameHeight();

    this.route.params
      .pipe(take(1))
      .subscribe((params) => {
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
      this.setPageLocales(data);

      this.appData.getSitemap(data.page.page.locale, data.pageType.name).then((response) => {
        this.selectedPageWithPageType = null;
        this.otherPagesWithPageType = response;
      });

      this.replacePageLocales = this.pageLocales.filter((a) => a.page);
      this.pageData = {
        id: data.page.page.id,
        name: data.page.page.name,
        publishedFrom: data.page.page.publishedFrom,
        publishedUntil: data.page.page.publishedUntil,
        slug: data.page.page.slug,
        sitemapId: data.page.page.sitemapId,
        online: data.page.page.status === 'online',
      };
      data.schema = this.schemaTransform.transformForm(data.schema);
      console.log(data);
      this.versionFields = data.schema ? data.schema : [];
      this.loadNavigationData(data.navigation);
      this.pageHasChildren = data.hasChildren;

      if (data.page.version.head === null) {
        this.versionData = {
          content: {},
        };
        this.savingVersion = false;
      } else if (this.currentPageVersion !== data.page.version.head) {
        this.versionData = null;
        this.currentPageVersion = data.page.version.head;
        this.appData.getPageVersionDetail(this.id, data.page.version.head).then((versionData) => {
          this.versionForm = new FormGroup({});
          this.versionData = versionData;
          console.log(versionData.content);
          this.savingVersion = false;
          return versionData;
        }).catch(() => this.savingVersion = false);
      }
      return data;
    }).catch(() => this.savingVersion = false);
  }

  private loadNavigationData(navigation) {
    this.navigationOptions = navigation;
    this.selectedNavigationOptions = navigation.filter((element) => element.active).map((element) => element.name);
  }

  goToOtherLanguage(data) {
    if (data.page) {
      this.router.navigateByUrl(`/page/${data.page.id}/edit`);
    } else {
      const initialState: ConfirmModalData = {
        title: 'Create Content?',
        confirmBtnType: 'success',
        confirmBtnIcon: 'fa fa-plus',
        confirmBtnTitle: 'Create',
        text: 'Page in this language doesn\'t exist yet. Do you want to create it and copy the content of this page?',
        onConfirm: () => {
          this.appData.postPageCopyToSitemapId(this.pageData.id, this.pageData.sitemapId, data.locale).then((response) => {
            this.notification.success('Page Data successfully copied', 'Success');
            this.router.navigateByUrl(`/page/${response.toPageId}/edit`);
          });
        },
      };
      this.modal.show(IxoConfirmModalComponent, {initialState});
    }
  }

  onReplaceContentModal(fromPageId) {
    const initialState: ConfirmModalData = {
      title: 'Replace Content?',
      confirmBtnType: 'warning',
      confirmBtnIcon: 'fa fa-edit',
      confirmBtnTitle: 'Replace',
      text: 'Do you really want to replace the Content of this Page?',
      onConfirm: () => {
        this.appData.postPageCopyToPageId(fromPageId, this.pageData.id).then(() => {
          this.loadDetailData();
          this.updateVersionIndex();
          this.notification.success('Page Data successfully copied', 'Success');
        });
      },
    };
    this.modal.show(IxoConfirmModalComponent, {initialState});
  }

  onSubmit(): void {
    if (this.versionForm.valid === false) {
      this.notification.formErrors(this.versionForm);
    } else {
      this.savingVersion = true;
      const content = this.versionForm.getRawValue();
      this.appData.createPageVersion(this.id, {content})
        .then(() => this.pageVersionCreated())
        .catch((error) => {
          this.savingVersion = false;
          this.notification.apiError(error);
        });
    }
  }

  private pageVersionCreated() {
    this.loadDetailData();
    this.updateVersionIndex();
    this.notification.success('Page Version successfully created', 'Success');
    this.savingVersion = false;
    this.previewIsOpen = false;
    if (this.previewIsOpen) {
      this.updatePreviewIFrame();
    }
  }

  doDelete(): void {
    if (this.pageHasChildren) {
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
    this.savingPageData = true;
    const postData = {};
    postData[key] = value;
    this.appData.updatePage(this.id, postData).then(() => {
      this.loadDetailData();
      this.savingPageData = false;
      this.notification.success(key + ' successfully saved', 'Success');
    }).catch((error) => {
      this.notification.apiError(error);
      this.savingPageData = false;
    });
  }

  openPreviewInNewTab() {
    this.data$.then((data) => {
      window.open(data.page.url);
    });
  }

  get locales() {
    return this.config.config.intl.locales;
  }

  setPageLocales(data) {
    const responseData = [];
    if (data && data.localizedPages) {
      for (const locale in data.localizedPages) {
        if (data.localizedPages.hasOwnProperty(locale)) {
          responseData.push({
            locale,
            page: data.localizedPages[locale].page,
          });
        }
      }
    }
    for (const locale of this.locales) {
      if (responseData.filter((a) => a.locale === locale.locale).length === 0) {
        if (locale.locale !== data.page.page.locale) {
          responseData.push({
            locale: locale.locale,
            page: null,
          });
        }
      }
    }
    this.pageLocales = responseData;
  }

  /**
   * Update the Preview iFrame
   */
  private updatePreviewIFrame() {
    this.keepPreviewOpen = true;
    document.getElementById('update-preview').click();
    this.keepPreviewOpen = false;
  }

  /**
   * React to changes in the screen-size and update the height of the preview iframe
   */
  @HostListener('window:resize', ['$event'])
  updateIFrameHeight() {
    this.iframeHeight = window.innerHeight - HEADING_HEIGHT - FOOTER_HEIGHT;
  }

  toggleSidebar() {
    this.sidebar.toggleSidebar();
    this.hideSidebarIcon = this.sidebar.arrowIcon;
  }

  /**
   * Show/Hide the preview of the current edit version, etc.
   */
  private handlePreviewSubmit() {
    const defaultPreview: DisplayTypes = 'MOBILE';

    if (!this.keepPreviewOpen) {

      this.previewIsOpen = !this.previewIsOpen;

      if (this.previewIsOpen) {
        this.calculatePreviewSplitView(defaultPreview);

        /**
         * Listen to changes in the form and update the preview while the preview ist active
         */
        this.formChanges = this.versionForm.valueChanges.pipe(
          takeWhile(() => this.previewIsOpen),
          debounceTime(700));

        this.formChanges
          .subscribe(() => this.updatePreviewIFrame());

      } else {
        /**
         * When preview is not active anymore, destroy the Split instance
         */
        if (this.split) {
          this.split.destroy();
        }
      }
    }
  }

  /**
   * Use split.js to add a splitter between the panels.
   *
   * The gutter is the dragging line in-between the panels.
   *
   * @param size the minimal size of the right panel. By default MOBILE is the smallest.
   */
  private calculatePreviewSplitView(size: DisplayTypes = 'MOBILE') {
    const gutterHeight = HEADING_HEIGHT + FOOTER_HEIGHT;
    const iframePixels = screensInPixels(size);

    if (this.split) {
      const oldGutter = document.getElementsByClassName('gutter gutter-horizontal').item(0);
      if (oldGutter) {
        oldGutter.remove();
      }
    }

    setTimeout(() =>
      this.split = Split(['.page-edit-left-panel', '.page-edit-right-panel'], {
        dragInterval: 50,
        sizes: [99, 1],
        minSize: [300, iframePixels],
        expandToMin: true,
        gutterStyle: () => ({
          'width': '5px',
          'height': 'calc(100vh - ' + gutterHeight + 'px)',
          'background-color': 'rgba(0,0,0,0.06)',
          'border-radius': '10px',
          'margin-left': '7px',
          'margin-right': '7px',
          'cursor': 'col-resize'
        })
      })
    );
  }
}
