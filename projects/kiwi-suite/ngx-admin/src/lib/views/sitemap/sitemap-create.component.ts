import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {PageService} from '../../services';
import {ResourceEditComponent} from '../resource';

@Component({
    selector: 'app-sitemap-create',
    templateUrl: './sitemap-create.component.html',
})
export class SitemapCreateComponent extends ResourceEditComponent {
    private locale: string;
    private parentSitemapId: string;

    constructor(protected dataService: PageService,
                protected route: ActivatedRoute) {
        super(route);

        this.route.params.pipe(takeUntil(this.destroyed$)).subscribe(
            params => {
                this.locale = params.locale;
                if (params.parentSitemapId) {
                    this.parentSitemapId = params.parentSitemapId;
                }
            });
    }

    get createSchema$() {
        return this.dataService.createSchema$;
    }

    protected initForm() {
        this.form = new FormGroup({});
        this.createSchema$.pipe(takeUntil(this.destroyed$))
            .subscribe(schema => this.fields = schema);
    }

    protected initModel() {
        this._model = {};
        this.resetForm();
    }

    onSubmit(action) {
        if (this.form.valid === false) {
            this.toastr.error('An error in saving the item. Are all required fields entered?', 'Error', {
                timeOut: 0,
            });
            return;
        }

        switch (action) {
            case 'create':
                let values = this.form.getRawValue();
                values['locale'] = this.locale;
                if (this.parentSitemapId) {
                    values['parentSitemapId'] = this.parentSitemapId;
                }
                this.dataService.create(this.model, values)
                    .subscribe(result => {
                        this.toastr.success('The item was successfully created ', 'Success');
                        // TODO: swapping directly to edit view is only possible if we know the model result consistently
                        // this.action = 'edit';
                        // this.initModel();
                        this.dataService.load();
                        this.router.navigate(['sitemap']);
                    }, () => {
                        this.toastr.error('There was an error in creating the item', 'Error', {
                            timeOut: 0,
                        });
                    });
                break;
        }
    }
}
