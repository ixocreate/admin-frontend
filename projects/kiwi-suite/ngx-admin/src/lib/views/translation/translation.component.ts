import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewAbstractComponent } from '../../components/view.abstract.component';
import { AppDataService } from '../../services/data/app-data.service';

@Component({
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent extends ViewAbstractComponent implements OnInit {

  translationCatalogue$: Promise<any>;

  constructor(private router: Router,
              public appData: AppDataService) {
    super();
  }

  ngOnInit() {
    this.translationCatalogue$ = this.appData.getTranslationCatalogue();
  }

  translationColor(current: number, max: number): string {
    const percent = max / current;
    console.log(percent);
    if (percent === 1) {
      return 'success';
    } else if (percent > .5) {
      return 'warning';
    }
    return 'danger';
  }

  goToCatalogue(catalogue: string) {
    // this.router.navigate([this.translationService.resourceKey, 'catalogue', catalogue]);
  }
}
