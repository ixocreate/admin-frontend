import {Component, OnInit} from '@angular/core';
import {TranslationService} from "../../services/resource/translation.service";
import {AppInjector, ConfigurationService, DataStoreService} from "../../services";
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'translation-edit',
    templateUrl: './translation-edit.component.html',
})
export class TranslationEditComponent implements OnInit
{
    protected config: ConfigurationService;
    protected dataStore: DataStoreService;
    protected translationService: TranslationService;
    protected toastr: ToastrService;

    data$: Observable<any>;
    catalogue: string;
    definitionId: string;

    constructor(
        protected route: ActivatedRoute
    ) {
        this.config = AppInjector.get(ConfigurationService);
        this.dataStore = AppInjector.get(DataStoreService);
        this.translationService = <TranslationService>this.dataStore.resource('translation');
        this.toastr = AppInjector.get(ToastrService);
    }

    ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                this.catalogue = params.catalogue;
                this.definitionId = params.id;
                this.data$ = this.translationService.getDetail$(params.catalogue, params.id);
            });
    }

    saveTranslation(data)
    {
        this.translationService.save(data, this.definitionId).subscribe(
            () => {
                this.toastr.success('Translation saved!', 'Success');
                this.data$ = this.translationService.getDetail$(this.catalogue, this.definitionId);
            }, () => {
                this.toastr.error('An error occurred while saving the translation', 'Error');
            }
        );
    }
}
