import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {AccountService, ConfigurationService} from '../../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {

    form: FormGroup;
    password: string;
    email: string;
    showError = false;

    constructor(private account: AccountService,
                private config: ConfigurationService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
        this.form = this.formBuilder.group({
            email: new FormControl(this.email, [
                Validators.required,
            ]),
            password: new FormControl(this.password, [
                Validators.required,
            ])
        });
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

    get ready$() {
        return this.config.ready$;
    }

    get config$() {
        return this.config.params$.pipe(map(config => config.project));
    }

    onSubmit() {
        this.account.login(this.form.getRawValue()).subscribe(
            () => {
                this.route.queryParams.subscribe(query => {
                    this.router.navigate([query.intended || '']);
                });
                this.account.load();
            },
            () => {
                this.showError = true;
            });
    }
}
