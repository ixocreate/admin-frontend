import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './containers/full-layout';
import {SimpleLayoutComponent} from './containers/simple-layout';
import {PermissionGuard} from '../kiwi';

export const routes: Routes = [
    {
        path: '',
        component: SimpleLayoutComponent
        /**
         * the initial component to show
         */
        // redirectTo: 'dashboard',
        // pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [PermissionGuard],
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                // lazy load module
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
                // sync load module (will not work wth AoT)
                // loadChildren: () => DashboardModule
            }
            /**
             * add you own...
             */
        ]
    },
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: '../kiwi/views/auth/auth.module#AuthModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [PermissionGuard]
})
export class AppRoutingModule {
}
