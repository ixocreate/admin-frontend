import {Component, OnInit} from '@angular/core';
import {TranslationService} from "../../services/resource/translation.service";
import {AppInjector, ConfigurationService, DataStoreService} from "../../services";
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'translation-index',
    templateUrl: './translation-index.component.html',
})
export class TranslationIndexComponent implements OnInit
{
    protected config: ConfigurationService;
    protected dataStore: DataStoreService;
    protected translationService: TranslationService;

    data$: Observable<any>;
    catalogue: string;
    search: string;

    constructor(
        protected route: ActivatedRoute
    ) {
        this.config = AppInjector.get(ConfigurationService);
        this.dataStore = AppInjector.get(DataStoreService);
        this.translationService = <TranslationService>this.dataStore.resource('translation');
    }

    ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                this.catalogue = params.catalogue;
                this.data$ = this.translationService.getCatalogueIndex$(params.catalogue);
            });
    }

    onSearch(): void {
        this.data$ = this.translationService.getCatalogueIndex$(this.catalogue, {search: this.search});
    }
}
