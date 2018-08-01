import {Component, OnInit} from '@angular/core';
import {AppInjector, ConfigurationService, DataStoreService} from "../../services";
import {TranslationService} from "../../services/resource/translation.service";
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'translation-catalogue',
    templateUrl: './translation-catalogue.component.html',
})
export class TranslationCatalogueComponent implements OnInit {
    protected config: ConfigurationService;
    protected dataStore: DataStoreService;
    protected translationService: TranslationService;
    protected router: Router;

    catalogues$: Observable<any>;

    constructor(
    ) {
        this.config = AppInjector.get(ConfigurationService);
        this.dataStore = AppInjector.get(DataStoreService);
        this.translationService = <TranslationService>this.dataStore.resource('translation');
        this.router = AppInjector.get(Router);
    }

    ngOnInit(): void {
        this.catalogues$ = this.translationService.catalogues$;
    }

    goToCatalogue(catalogue: string) {
        this.router.navigate([this.translationService.resourceKey, 'catalogue', catalogue,]);
    }
}
