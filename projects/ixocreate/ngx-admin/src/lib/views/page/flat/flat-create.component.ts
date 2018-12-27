import { Component } from '@angular/core';
import {PageCreateComponent} from "../create/page-create.component";

@Component({
  templateUrl: '../create/page-create.component.html',
})
export class FlatCreateComponent extends PageCreateComponent {

  private handle;

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.handle = params.handle;
    });
  }

  getRedirectUrl(response) {
    return '/page-flat/' + this.handle + '/' + response + '/edit';
  }
}
