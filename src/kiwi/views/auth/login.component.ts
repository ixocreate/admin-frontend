import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigurationService, UserService} from '../../services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    password: any;

    loginForm: FormGroup;
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

    onSubmit() {
        this.user.login(this.loginForm.getRawValue())
            .subscribe(user => {
                    console.log(user);
                },
                error => {
                    console.log(error);
                });

        // this.hero = this.prepareSaveHero();
        // this.heroService.updateHero(this.hero).subscribe(/* error handling */);
        // this.ngOnChanges();
    }
}
