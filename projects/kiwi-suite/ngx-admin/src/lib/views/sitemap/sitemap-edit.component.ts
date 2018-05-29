import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {takeUntil} from 'rxjs/operators';
import {PageService} from '../../services';
import {ResourceEditComponent} from '../resource';

@Component({
    selector: 'app-sitemap-edit',
    templateUrl: './sitemap-edit.component.html',
})
export class SitemapEditComponent extends ResourceEditComponent implements OnInit {

    /**
     * not a standard resource that needs to be prefixed in url (resource/)
     */
    protected pathPrefix = '';

    private _contentModel: any;
    contentForm: FormGroup;
    contentModel: any;
    contentFields: FormlyFieldConfig[];

    constructor(protected dataService: PageService,
                protected route: ActivatedRoute) {
        super(route);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.contentModel = null;
        this.contentForm = null;
    }

    get pageTypeSchema$() {
        return this.dataService.pageTypeSchema$;
    }

    protected initForm() {
        super.initForm();
        this.contentForm = new FormGroup({});
        this.dataService.loadPageTypeSchema()
            .subscribe(schema => {
                this.contentFields = schema;
            });
    }

    protected initModel() {
        this.route.params.pipe(takeUntil(this.destroyed$))
            .subscribe(params => {
                this.dataService.find(params['id'])
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(model => {
                        if (!model) {
                            return;
                        }
                        this._contentModel = model;
                        this.resetForm();
                    });
            });
    }

    protected resetModel() {
        this.model = Object.assign({}, this._model);
        this.contentModel = Object.assign({}, this._contentModel);
    }

    onSubmitContent() {
        if (this.contentForm.valid === false) {
            this.toastr.error('An error in saving the item. Are all required fields entered?', 'Error', {
                timeOut: 0,
            });
            return;
        }
        this.dataService.update(this.model, this.contentForm.getRawValue())
            .subscribe(
                (result) => {
                    this.toastr.success('The item was successfully updated ', 'Success');
                    /**
                     * loading the dataservice here causes the form to reinitialise
                     * which results in unexpected results (duplicating items in the form raw model)
                     */
                    // this.dataService.load(this.model.id);
                }, () => {
                    this.toastr.error('There was an error in updating the item', 'Error', {
                        timeOut: 0,
                    });
                }
            );
    }
}
