import { Component, OnInit } from '@angular/core';
import { PageAddComponent } from '../add/page-add.component';

@Component({
  templateUrl: '../add/page-add.component.html',
})
export class FlatAddComponent extends PageAddComponent implements OnInit {

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
