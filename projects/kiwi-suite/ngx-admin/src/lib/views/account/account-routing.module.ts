import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from '../../permission.guard';
import {AccountComponent} from './account.component';

const routes: Routes = [
    {
        path: '',
        canLoad: [PermissionGuard],
        component: AccountComponent,
        data: {
            title: 'Account'
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
