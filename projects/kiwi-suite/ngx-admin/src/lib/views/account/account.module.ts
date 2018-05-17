import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    declarations: [AccountComponent]
})
export class AccountModule {
}
