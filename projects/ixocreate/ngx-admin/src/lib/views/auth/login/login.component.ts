import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDataService } from '../../../services/data/account-data.service';
import { AppDataService } from '../../../services/data/app-data.service';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: any = null;
  loginMessage = '';

  constructor(private router: Router,
              public appData: AppDataService,
              public config: ConfigService,
              private accountData: AccountDataService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loginMessage = this.config.config.project.loginMessage;
  }

  onLogin() {
    this.accountData.login(this.form.value.email, this.form.value.password).then(() => {
      this.appData.loadConfig().then(() => {
        this.accountData.loadUser().then(() => {
          this.route.queryParams.subscribe((query) => {
            this.router.navigateByUrl(query.intended || '/');
          });
        });
      });
    }).catch((error) => {
      this.error = error;
    });
  }
}
