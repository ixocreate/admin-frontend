import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {AccountService, AppInjector} from '../../services';
import {ResourceEditComponent} from '../resource';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
})
export class AccountComponent extends ResourceEditComponent implements OnInit {

    protected dataService: AccountService;

    avatarForm: FormGroup;
    avatar: FileList;

    passwordForm: FormGroup;
    passwordFormModel = {password: '', passwordRepeat: '', passwordOld: ''};

    emailForm: FormGroup;
    emailFormModel = {email: '', emailRepeat: ''};

    constructor(protected route: ActivatedRoute) {
        super(route);
        this.dataService = AppInjector.get(AccountService);
    }

    ngOnInit() {
        this.dataService.model$.pipe(takeUntil(this.destroyed$))
            .subscribe(user => {
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
        this.dataService.updateEmail(this.model, this.emailForm.getRawValue())
            .subscribe(() => {
                this.dataService.load();
                this.toastr.success('The email was successfully updated ', 'Success');
            }, () => {
                this.toastr.error('There was an error in updating the email', 'Error', {
                    timeOut: 0,
                });
            });
    }

    onSubmitPassword() {
        this.dataService.updatePassword(this.model, this.passwordForm.getRawValue())
            .subscribe(() => {
                this.dataService.load();
                this.toastr.success('The password was successfully updated ', 'Success');
            }, () => {
                this.toastr.error('There was an error in updating the password', 'Error', {
                    timeOut: 0,
                });
            });
    }
}
