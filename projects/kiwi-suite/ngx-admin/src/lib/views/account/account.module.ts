import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
    ],
    declarations: [AccountComponent]
})
export class AccountModule {
}
