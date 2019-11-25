import { Component } from '@angular/core';
import { ViewAbstractComponent } from '../../components/view.abstract.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  templateUrl: './media.component.html',
})
export class MediaComponent extends ViewAbstractComponent {

  page = 1;
  search = '';
  mediaType = '';

  constructor(private router: Router, private location: Location, private route: ActivatedRoute) {
    super();
    if (this.route.snapshot.queryParams.page) {
      this.page = parseInt(this.route.snapshot.queryParams.page, 10);
    }
    if (this.route.snapshot.queryParams.mediaType) {
      this.mediaType = this.route.snapshot.queryParams.mediaType;
    }
    if (this.route.snapshot.queryParams.search) {
      this.search = this.route.snapshot.queryParams.search;
    }
  }

  onSelect(element) {
    this.router.navigateByUrl('media/' + element.id + '/edit');
  }

  onChangeFilters(data: { search: string, mediaType: string, page: number }) {
    const params = [];
    if (data.search) {
      params.push('search=' + data.search);
    }
    if (data.mediaType) {
      params.push('mediaType=' + data.mediaType);
    }
    if (data.page) {
      params.push('page=' + data.page);
    }
    this.location.replaceState(this.location.path(false).split('?')[0], params.join('&'));
  }

}
