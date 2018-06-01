import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {map, takeUntil} from 'rxjs/operators';
import {AsideService, PageService} from '../../services';
import {ResourceEditComponent} from '../resource';

@Component({
    selector: 'app-sitemap-edit',
    templateUrl: './sitemap-edit.component.html',
})
export class SitemapEditComponent extends ResourceEditComponent implements OnInit, OnDestroy {
    @ViewChild('asideTemplate')
    private asideTemplateTpl: TemplateRef<any>;

    /**
     * not a standard resource that needs to be prefixed in url (resource/)
     */
    protected pathPrefix = '';

    private _contentModel: any;
    contentForm: FormGroup;
    contentModel: any;
    contentFields: FormlyFieldConfig[];

    private _navigationModel: any;
    navigationForm: FormGroup;
    navigationModel: any;
    navigationFields: FormlyFieldConfig[];

    constructor(protected dataService: PageService,
                protected asideService: AsideService,
                protected route: ActivatedRoute) {
        super(route);
    }

    ngOnInit() {
        super.ngOnInit();
        this.asideService.enable(this.asideTemplateTpl);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.asideService.disable();
        this._contentModel = null;
        this.contentModel = null;
        this.contentForm = null;
    }

    get contentSchema$() {
        return this.dataService.contentSchema$;
    }

    get navigationSchema$() {
        return this.dataService.navigationSchema$;
    }

    protected initForm() {
        super.initForm();
        this.contentForm = new FormGroup({});
        this.dataService.loadContentSchema()
            .subscribe(schema => {
                this.contentFields = schema;
            });
        this.navigationForm = new FormGroup({});
        this.dataService.loadNavigationSchema()
            .subscribe(schema => {
                this.navigationFields = schema;
            });
    }

    protected initModel() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {

                /**
                 * load page
                 */
                this.dataService.find(params['id'])
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(model => {
                        if (!model) {
                            return;
                        }
                        this._model = model;

                        /**
                         * load content
                         */
                        this.dataService.content()
                            .pipe(takeUntil(this.destroyed$))
                            .subscribe(contentModel => {
                                if (!contentModel) {
                                    return;
                                }
                                this._contentModel = contentModel;

                                /**
                                 * load navigation
                                 */
                                this.dataService.navigation()
                                    .pipe(
                                        takeUntil(this.destroyed$),
                                        map(navigation => {
                                            if (!navigation) {
                                                return;
                                            }
                                            return navigation.filter(item => item.active).map(item => item.name);
                                        })
                                    )
                                    .subscribe(navigationModel => {
                                        if (!navigationModel) {
                                            return;
                                        }
                                        this._navigationModel = {navigation: navigationModel};
                                        this.resetForm();
                                    });
                            });
                    });
            });
    }

    protected resetModel() {
        this.model = Object.assign({}, this._model);
        this.contentModel = Object.assign({}, this._contentModel);
        this.navigationModel = Object.assign({}, this._navigationModel);
    }

    onSubmit(action = null): void {
        /**
         * TODO: check if respective form is dirty before sending it
         */

        /**
         * submit page metadata (default resource here)
         */
        super.onSubmit('edit');

        /**
         * submit content
         */
        this.onSubmitContent();

        /**
         * submit navigation
         */
        this.onSubmitNavigation();
    }

    private onSubmitContent() {
        if (this.contentForm.valid === false) {
            this.toastr.error('An error occurred while saving the content. Are all required fields entered?', 'Error');
            return;
        }
        this.dataService.updateContent(this.contentModel, this.contentForm.getRawValue())
            .subscribe(
                (result) => {
                    this.toastr.success('Content was successfully updated ', 'Success');
                    /**
                     * loading the dataservice here causes the form to reinitialise
                     * which results in unexpected results (duplicating items in the form raw model)
                     */
                    // this.dataService.load(this.model.id);
                }, () => {
                    this.toastr.error('There was an error in updating the content', 'Error');
                }
            );
    }

    private onSubmitNavigation() {
        if (this.navigationForm.valid === false) {
            this.toastr.error('An error occurred while saving the navigation. Are all required fields entered?', 'Error');
            return;
        }
        this.dataService.updateNavigation(this.navigationModel, this.navigationForm.getRawValue())
            .subscribe(
                (result) => {
                    this.toastr.success('Navigation was successfully updated ', 'Success');
                    /**
                     * loading the dataservice here causes the form to reinitialise
                     * which results in unexpected results (duplicating items in the form raw model)
                     */
                    // this.dataService.load(this.model.id);
                }, () => {
                    this.toastr.error('There was an error in updating the navigation', 'Error');
                }
            );
    }
}
