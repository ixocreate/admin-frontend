import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ResourceEditComponent} from '../../../kiwi/components/resource/resource-edit.component';
import {SchemaFormBuilder} from '../../../kiwi/forms/schema-form-builder';
import {User} from '../../../kiwi/models';
import {AccountService, UserService} from '../../../kiwi/services';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
})
export class UserEditComponent extends ResourceEditComponent implements OnInit, OnDestroy {

    model: User;
    account: User;

    emailForm: FormGroup;
    emailFormModel = {email: '', emailRepeat: ''};

    updateForm: FormGroup;

    password: string;
    passwordRepeat: string;

    constructor(protected dataService: UserService,
                protected accountService: AccountService,
                protected formBuilder: SchemaFormBuilder,
                protected route: ActivatedRoute,
                protected router: Router,
                protected toastr: ToastrService) {
        super(dataService, accountService, formBuilder, route, router, toastr);
    }

    ngOnInit() {
        this.accountService.model$.subscribe(account => {
            this.account = account;

            super.ngOnInit();
        });
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
                this.toastr.success('The item was successfully updated ', 'Success');
            }, () => {
                this.toastr.error('There was an error in updating the item', 'Error', {
                    timeOut: 0,
                });
            });
    }
}
