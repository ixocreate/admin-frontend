import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from '../auth/guards';

import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [PermissionGuard],
        data: {
            title: 'Dashboard'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
