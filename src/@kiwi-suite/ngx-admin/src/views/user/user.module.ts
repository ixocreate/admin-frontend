import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {UserEditComponent} from './user-edit.component';
import {UserListComponent} from './user-list.component';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        UserRoutingModule,
        NgSelectModule,
    ],
    declarations: [
        UserEditComponent,
        UserListComponent,
    ],
    providers: [
        // UserResolver
    ]
})
export class UserModule {
}
