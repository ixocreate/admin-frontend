import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-redirect',
  template: '<div></div>',
})
export class RedirectComponent implements OnInit{


  constructor(private router: Router,
              private config: ConfigService) {
  }

  ngOnInit() {
    if (this.config.navigation.length === 0) {
      this.router.navigate(['/account']);
      return;
    }

    let url = null;

    this.config.navigation.forEach((value) => {
      if (url !== null) {
        return;
      }

      if (value.hasOwnProperty('title') && value.title === true) {
        return;
      }

      if (value.hasOwnProperty('url') ) {
        url = value.url;
      }
    });

    if (url !== null) {
      this.router.navigate([url]);
      return;
    }

    this.router.navigate(['/account']);
  }

}
