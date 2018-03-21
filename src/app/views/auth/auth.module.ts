import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {ResetComponent} from './reset/reset.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        AlertModule.forRoot()
    ],
    declarations: [
        LoginComponent,
        ResetComponent,
    ]
})
export class AuthModule {
    constructor() {
    }
}
