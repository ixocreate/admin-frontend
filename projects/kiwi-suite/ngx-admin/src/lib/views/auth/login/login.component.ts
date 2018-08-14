import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDataService } from '../../../services/data/account-data.service';
import { AppDataService } from '../../../services/data/app-data.service';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent {

  form: FormGroup;
  error: string = null;

  constructor(private router: Router,
              private auth: AuthService,
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

  onLogin() {
    this.accountData.login(this.form.value.email, this.form.value.password).then(() => {
      this.appData.loadConfig().then(() => {
        this.route.queryParams.subscribe(query => {
          this.router.navigate([query.intended || '/']);
        });
      });
    }).catch((error) => {
      this.error = error.errorCode;
    });
  }

}
