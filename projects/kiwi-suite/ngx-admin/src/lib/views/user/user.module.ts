import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AuthModule} from '../auth';
import {ResourceModule} from '../resource';
import {UserListComponent} from './components';
import {UserEditComponent} from './user-edit.component';
import {UserIndexComponent} from './user-index.component';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        ResourceModule,
        UserRoutingModule,
        NgSelectModule,
    ],
    declarations: [
        UserEditComponent,
        UserIndexComponent,
        UserListComponent,
    ],
    providers: [
        // UserResolver
    ],
})
export class UserModule {
}
