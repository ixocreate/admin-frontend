import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService, ConfigurationService} from '../../../../kiwi/services';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
})
export class ResetComponent implements OnInit {

    public form: FormGroup;
    email: string;

    constructor(private router: Router,
                private account: AccountService,
                private config: ConfigurationService,
                private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            email: new FormControl(this.email, [
                Validators.required,
                Validators.minLength(4),
            ]),
        });
    }

    ngOnInit() {
    }

    get ready$() {
        return this.config.ready$;
    }

    onSubmit() {
        this.account.sendResetPasswordEmail(this.form.getRawValue());
    }

}
