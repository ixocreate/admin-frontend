import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserEditComponent} from './user-edit.component';
import {UserListComponent} from './user-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Users'
        },
        children: [
            {
                path: '',
                component: UserListComponent,
                data: {
                    title: 'Users',
                },
            },
            {
                path: 'create',
                component: UserEditComponent,
                data: {
                    title: 'User',
                    action: 'create',
                }
            },
            {
                path: ':id/edit',
                component: UserEditComponent,
                data: {
                    title: 'User',
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
