import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ResourceEditComponent} from '../../../kiwi/components/resource/resource-edit.component';
import {SchemaFormBuilder} from '../../../kiwi/forms/schema-form-builder';
import {AccountService} from '../../../kiwi/services';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
})
export class AccountComponent extends ResourceEditComponent implements OnInit {

    avatarForm: FormGroup;
    avatar: FileList;

    passwordForm: FormGroup;
    passwordFormModel = {password: '', passwordRepeat: '', passwordOld: ''};

    emailForm: FormGroup;
    emailFormModel = {email: '', emailRepeat: ''};

    constructor(protected dataService: AccountService,
                protected accountService: AccountService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected formBuilder: SchemaFormBuilder,
                protected toastr: ToastrService) {
        super(dataService, accountService, formBuilder, route, router, toastr);
    }

    ngOnInit() {
        this.dataService.model$.subscribe(user => {
            this.model = user;
            this.initForm();
        });
    }

    initForm() {
        this.avatarForm = this.formBuilder.group({
            avatar: new FormControl(this.avatar, [
                Validators.required
            ]),
        });

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

        this.passwordForm = this.formBuilder.group({
            password: new FormControl(this.passwordFormModel.password, [
                Validators.required,
                Validators.minLength(4),
            ]),
            passwordRepeat: new FormControl(this.passwordFormModel.passwordRepeat, [
                Validators.required,
                Validators.minLength(4),
            ]),
            passwordOld: new FormControl(this.passwordFormModel.passwordOld, [
                Validators.required,
                Validators.minLength(4),
            ])
        });
    }

    onFileChange($event, field) {
        this.avatarForm.controls[field].setValue($event.target.files);
    }

    onSubmitAvatar() {
        this.dataService.updateAvatar(this.avatarForm.getRawValue());
    }

    onSubmitEmail() {
        this.dataService.updateEmail(this.model, this.emailForm.getRawValue()).subscribe(() => {
            this.dataService.model$.subscribe(user => {
                this.model = user;
            });
        });
    }

    onSubmitPassword() {
        this.dataService.updatePassword(this.model, this.passwordForm.getRawValue()).subscribe(() => {

        });
    }
}
