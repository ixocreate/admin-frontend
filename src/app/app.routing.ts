import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from '../kiwi';
import {FullLayoutComponent} from './containers/full-layout';
import {SimpleLayoutComponent} from './containers/simple-layout';
import {PageNotFoundComponent} from './views/errors/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './views/auth/auth.module#AuthModule'
            },
            {
                path: '',
                component: FullLayoutComponent,
                // canActivateChild: [PermissionGuard],
                data: {
                    title: 'Home',

                },
                children: [
                    /**
                     * Default routes
                     */
                    {
                        path: 'user',
                        // lazy load module
                        // sync load module (will not work wth AoT)
                        // loadChildren: () => DashboardModule
                        loadChildren: './views/user/user.module#UserModule',
                        canActivate: [PermissionGuard],
                    },
                    {
                        path: 'account',
                        loadChildren: './views/account/account.module#AccountModule'
                    },
                    {
                        path: 'dashboard',
                        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
                        canActivate: [PermissionGuard],
                    },
                    /**
                     * Register your custom routes here
                     */
                    /**
                     * TODO: wildcard for resources
                     */
                    // {
                    //     path: '**',
                    //     loadChildren: '../../kiwi/views/resource/resource.module#ResourceModule',
                    //     canActivate: [PermissionGuard],
                    // },
                    // {
                    //     path: 'resource/:type/',
                    //     loadChildren: './views/tag/tags.module#ResourceModule',
                    //     canActivate: [PermissionGuard],
                    // },
                ]
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [PermissionGuard]
})
export class AppRoutingModule {
}
