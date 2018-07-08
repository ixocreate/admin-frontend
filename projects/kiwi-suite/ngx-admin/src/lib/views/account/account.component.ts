import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {AccountService} from '../../services';
import {ResourceEditComponent} from '../resource';
import {User} from "../../models/resource.model";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
})
export class AccountComponent extends ResourceEditComponent implements OnInit {
    account: User;

    passwordForm: FormGroup;
    passwordFormFields: FormlyFieldConfig[];
    passwordFormModel = {password: '', passwordRepeat: '', passwordOld: ''};

    emailForm: FormGroup;
    emailFormFields: FormlyFieldConfig[];
    emailFormModel = {email: '', emailRepeat: ''};

    constructor(protected route: ActivatedRoute,
                protected dataService: AccountService) {
        super(route);
    }

    protected initModel() {
        this.dataService.user$.pipe(takeUntil(this.destroyed$))
            .subscribe(user => {
                console.log("test");
                if (!user) {
                    return;
                }
                this.account = user;
                this.initForm();
            });
    }

    initForm() {
        this.emailForm = new FormGroup({});
        this.emailFormFields = [
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'New email address',
                    placeholder: 'New email address',
                    required: true,
                }
            },
            {
                key: 'emailRepeat',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Repeat email address',
                    placeholder: 'Repeat email address',
                    required: true,
                }
            }
        ];

        this.passwordForm = new FormGroup({});
        this.passwordFormFields = [
            {
                key: 'passwordOld',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'Enter your current password',
                    placeholder: 'Enter your current password',
                    required: true,
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'New password',
                    placeholder: 'New password',
                    required: true,
                }
            },
            {
                key: 'passwordRepeat',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'Repeat password',
                    placeholder: 'Repeat password',
                    required: true,
                }
            }

        ];
    }

    onSubmitEmail() {
        // this.dataService.updateEmail(this.account, this.emailForm.getRawValue())
        //     .subscribe(() => {
        //         this.dataService.load();
        //         this.toastr.success('The email was successfully updated ', 'Success');
        //     }, () => {
        //         this.toastr.error('There was an error in updating the email', 'Error');
        //     });
    }

    onSubmitPassword() {
        // this.dataService.updatePassword(this.account, this.passwordForm.getRawValue())
        //     .subscribe(() => {
        //         this.dataService.load();
        //         this.toastr.success('The password was successfully updated ', 'Success');
        //     }, () => {
        //         this.toastr.error('There was an error in updating the password', 'Error');
        //     });
    }
}
