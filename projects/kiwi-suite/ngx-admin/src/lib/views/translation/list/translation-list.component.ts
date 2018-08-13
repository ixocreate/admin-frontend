import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ViewAbstractComponent } from '../../../components/view.abstract.component';

@Component({
  selector: 'translation-list',
  templateUrl: './translation-list.component.html',
})
export class TranslationListComponent extends ViewAbstractComponent implements OnInit {
  protected config: ConfigurationService;
  protected dataStore: DataStoreService;
  protected translationService: TranslationService;

  data$: Observable<any>;
  catalogue: string;
  search: string;

  constructor(protected route: ActivatedRoute) {
    super();
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
