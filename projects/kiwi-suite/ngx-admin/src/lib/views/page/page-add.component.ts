import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
    AccountService,
    ApiService,
    AppInjector,
    ConfigurationService,
    DataStoreService,
    ResourceService
} from "../../services";
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {PageService} from "@kiwi-suite/ngx-admin";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'page-add',
    templateUrl: './page-add.component.html',
})
export class PageAddComponent implements OnInit {
    protected type = "page";
    protected sitemapId: string = null;
    protected locale: string;

    protected dataService: PageService;

    form: FormGroup;
    fields: FormlyFieldConfig[];
    model : {};

    protected apiService: ApiService;
    protected config: ConfigurationService;
    protected dataStore: DataStoreService;
    protected accountService: AccountService;
    protected router: Router;
    protected toastr: ToastrService;

    constructor(
        protected route: ActivatedRoute
    ) {
        this.apiService = AppInjector.get(ApiService);
        this.accountService = AppInjector.get(AccountService);
        this.config = AppInjector.get(ConfigurationService);
        this.dataStore = AppInjector.get(DataStoreService);
        this.router = AppInjector.get(Router);
        this.toastr = AppInjector.get(ToastrService);
    }

    ngOnInit() {
        this.dataService = <PageService>this.dataStore.resource('page');

        this.route.params
            .subscribe(params => {
                this.locale = params.locale;
                this.sitemapId = params.sitemapId;
            });

        this.form = new FormGroup({});
        this.fields = [
            {
                key: "name",
                type: "input",
                templateOptions: {
                    label: "Name",
                    placeholder: "Name",
                    required: true,
                }
            }
        ];
    }



    onSubmit(): void {
        if (this.form.valid === false) {
            this.toastr.error('An error occurred while saving the page. Are all required fields entered?', 'Error');
            return;
        }
        let value = this.form.getRawValue();
        value['locale'] = this.locale;
        value['sitemapId'] = this.sitemapId;


        this.dataService.addPage(value).subscribe(
            (result: { id: string }) => {
                this.toastr.success('The Page was successfully created', 'Success');
                this.router.navigate(['page', result.id, 'edit']);
            }, () => {
                this.toastr.error('There was an error in creating the page', 'Error');
            });
    }
}
