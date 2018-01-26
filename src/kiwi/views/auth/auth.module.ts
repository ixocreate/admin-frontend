import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent]
})
export class AuthModule {
    constructor() {
    }
}
