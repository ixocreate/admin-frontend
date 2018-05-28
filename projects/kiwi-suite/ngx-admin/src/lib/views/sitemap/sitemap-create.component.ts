import {Component, Inject} from '@angular/core';
import {ResourceEditComponent} from "../resource/resource-edit.component";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-sitemap-create',
    templateUrl: './sitemap-create.component.html',
})
export class SitemapCreateComponent extends ResourceEditComponent{
    protected type: string = "page";
    protected _schema: any;
    protected _schema$ = new BehaviorSubject<any>({});
    protected _loading$ = new BehaviorSubject<boolean>(false);

    private locale: string;
    private parentSitemapId: string;

    constructor(@Inject(ApiService) protected api: ApiService, protected route: ActivatedRoute)
    {
        super(route);
    }

    get createSchemaLink() {
        return this.config.params.routes['pageCreateSchema'];
    }

    get schema$() {
        return this._schema$.asObservable();
    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
            this.locale = params.locale;
            if (params.parentSitemapId) {
                this.parentSitemapId = params.parentSitemapId;
            }
            super.ngOnInit();
        });
    }

    protected loadSchema() {
        this.config.ready$.subscribe(() => {
            if (!this.createSchemaLink) {
                return;
            }
            this._loading$.next(true);
            this.api.get<any[]>(this.createSchemaLink)
                .subscribe(
                    schema => {
                        this._schema = schema;
                        this._schema$.next(this._schema);
                    },
                    () => {
                    },
                    () => {
                        this._loading$.next(false);
                    }
                );
        });
    }

    initForm() {
        this.form = new FormGroup({});
        this.loadSchema();
        this.schema$.pipe(takeUntil(this.destroyed$))
            .subscribe(schema => this.fields = schema);

        // this.fields = [{
        //     key: 'name',
        //     type: 'input',
        //     templateOptions: {
        //         type: 'text',
        //         label: 'Name',
        //         placeholder: 'Name',
        //         required: true,
        //     }
        // }];

        // this.buildFormFromSchemas(ModelSchemas.all, this.dataService.resourceKey);
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
