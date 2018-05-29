import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../models';
import {AccountService, UserService} from '../../services';
import {ResourceEditComponent} from '../resource';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
})
export class UserEditComponent extends ResourceEditComponent implements OnInit {

    /**
     * not a standard resource that needs to be prefixed in url (resource/)
     */
    protected pathPrefix = '';

    model: User;
    account: User;

    emailForm: FormGroup;
    emailFormModel = {email: '', emailRepeat: ''};

    updateForm: FormGroup;

    password: string;
    passwordRepeat: string;

    constructor(protected accountService: AccountService,
                protected dataService: UserService,
                protected route: ActivatedRoute) {
        super(route);

        this.accountService.model$.pipe(takeUntil(this.destroyed$))
            .subscribe(account => {
                this.account = account;
                super.ngOnInit();
            });
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm() {

        // create

        this.form = this.formBuilder.group({
            email: new FormControl(this.model.email, [
                Validators.required
            ]),
            role: new FormControl(this.model.role, [
                Validators.required,
            ]),
            password: new FormControl(this.password, [
                Validators.required,
            ]),
            passwordRepeat: new FormControl(this.passwordRepeat, [
                Validators.required,
            ]),
        });

        // edit

        this.emailForm = this.formBuilder.group({
            email: new FormControl(this.emailFormModel.email, [
                Validators.required,
                Validators.minLength(4),
            ]),
            emailRepeat: new FormControl(this.emailFormModel.emailRepeat, [
                Validators.required,
                Validators.minLength(4),
            ])
        });

        this.updateForm = this.formBuilder.group({
            role: new FormControl(this.model.role, [
                Validators.required,
            ]),
            status: new FormControl(this.model.status, [
                Validators.required,
            ])
        });
    }

    onSubmitEmail() {
        this.dataService.updateEmail(this.model, this.emailForm.getRawValue())
            .subscribe((result) => {
                this.dataService.load();
                this.toastr.success('The email was successfully updated ', 'Success');
            }, () => {
                this.toastr.error('There was an error in updating the email', 'Error', {
                    timeOut: 0,
                });
            });
    }

    onSubmitUpdate() {
        this.dataService.update(this.model, this.updateForm.getRawValue())
            .subscribe((result) => {
                this.dataService.load();
                this.toastr.success('The user was successfully updated ', 'Success');
            }, () => {
                this.toastr.error('There was an error in updating the user', 'Error', {
                    timeOut: 0,
                });
            });
    }
}
