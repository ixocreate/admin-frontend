import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from '../../containers/full-layout';
import {PermissionGuard} from '../auth/guards';
import {UserEditComponent} from './user-edit.component';
import {UserListComponent} from './user-list.component';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home',
        },
        children: [
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Users'
                        },
                        children: [
                            {
                                path: '',
                                component: UserListComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'List'
                                },
                            },
                            {
                                path: 'create',
                                component: UserEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Create User',
                                    action: 'create',
                                }
                            },
                            {
                                path: ':id/edit',
                                component: UserEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Edit User',
                                    action: 'edit',
                                }
                            }
                        ]
                    },
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
