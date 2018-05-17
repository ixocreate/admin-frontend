import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from '../../permission.guard';
import {UserEditComponent} from './user-edit.component';
import {UserListComponent} from './user-list.component';

const routes: Routes = [
    {
        path: '',
        canLoad: [PermissionGuard],
        data: {
            title: 'Users'
        },
        children: [
            {
                path: '',
                component: UserListComponent,
                canLoad: [PermissionGuard],
                data: {
                    title: ''
                },
            },
            {
                path: 'create',
                component: UserEditComponent,
                canLoad: [PermissionGuard],
                data: {
                    title: 'Create User',
                    action: 'create',
                }
            },
            {
                path: ':id/edit',
                component: UserEditComponent,
                canLoad: [PermissionGuard],
                data: {
                    title: 'Edit User',
                    action: 'edit',
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
