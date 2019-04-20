import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-redirect',
  template: '<div></div>',
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router,
              private config: ConfigService) {
  }

  ngOnInit() {
    let url = null;

    for (const value of this.config.navigation) {
      if (value.hasOwnProperty('title') && value.title === true) {
        continue;
      }

      if (value.hasOwnProperty('url')) {
        url = value.url;
        break;
      }
    }

    if (url !== null) {
      this.router.navigateByUrl(url);
      return;
    }

    this.router.navigateByUrl('/account');
  }

}
