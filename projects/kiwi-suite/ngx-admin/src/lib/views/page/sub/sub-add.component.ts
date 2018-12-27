import { Component } from '@angular/core';
import { PageAddComponent } from '../add/page-add.component';

@Component({
  templateUrl: '../add/page-add.component.html',
})
export class SubAddComponent extends PageAddComponent {

  private handle;

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.handle = params.handle;
    });
  }

  getRedirectUrl(response) {
    return '/page-sub/' + this.handle + '/' + response + '/edit';
  }
}
