import { Component, OnInit } from '@angular/core';
import { PageCreateComponent } from '../create/page-create.component';
import { PageAddComponent } from '../add/page-add.component';

@Component({
  templateUrl: '../create/page-create.component.html',
})
export class FlatCreateComponent extends PageCreateComponent implements OnInit {

  private handle;

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe((params) => {
      this.handle = params.handle;
    });
  }

  getRedirectUrl(response) {
    return '/page-flat/' + this.handle + '/' + response + '/edit';
  }
}
