import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AppDataService } from '../../../services/data/app-data.service';

@Component({
  selector: 'kiwi-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {

  form: FormGroup;
  error: string = null;

  constructor(private router: Router,
              private auth: AuthService,
              public appData: AppDataService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    console.log(email, password);
  }

}
