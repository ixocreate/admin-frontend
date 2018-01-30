import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigurationService, UserService} from '../../../kiwi/services/index';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    password: any;
    email: string;

    constructor(private router: Router, private user: UserService, private config: ConfigurationService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: new FormControl(this.email, [
                Validators.required,
                Validators.minLength(4),
            ]),
            password: new FormControl(this.password, [
                Validators.required,
                Validators.minLength(4),
            ])
        });
    }

    get ready$() {
        return this.config.ready$;
    }

    onSubmit() {
        this.user.login(this.loginForm.getRawValue());
    }
}
