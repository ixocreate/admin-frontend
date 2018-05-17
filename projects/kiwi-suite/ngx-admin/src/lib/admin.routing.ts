import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './containers/full-layout';
import {SimpleLayoutComponent} from './containers/simple-layout';
import {PermissionGuard} from './permission.guard';
import {AuthModule} from './views/auth';
import {PageNotFoundComponent} from './views/errors';
import {MediaModule} from './views/media';
import {ResourceModule} from './views/resource';
import {UserModule} from './views/user';

// Do not delete. Used to ensure Module is loaded in the same bundle.
// Referencing the function directly in `loadChildren` breaks AoT compiler.
export function loadAuthModule() {
    return AuthModule;
}

export function loadMediaModule() {
    return MediaModule;
}

export function loadResourceModule() {
    return ResourceModule;
}

export function loadUserModule() {
    return UserModule;
}

export const routes: Routes = [
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
            {
                path: 'auth',
                /**
                 * sync load module will not work wth AoT:
                 * loadChildren: () => AuthModule
                 * instead write as string literal as if it was lazy loaded but include it in here to be bundled
                 * see load*Module() above
                 * from: https://github.com/angular/angular-cli/issues/4192#issuecomment-274775116
                 */
                loadChildren: './views/auth/auth.module#AuthModule',
            },
            {
                path: '',
                component: FullLayoutComponent,
                data: {
                    title: 'Home',
                },
                children: [
                    /**
                     * Default routes
                     */
                    {
                        path: 'account',
                        loadChildren: './views/account/account.module#AccountModule'
                    },
                    // {
                    //     path: 'dashboard',
                    //     loadChildren: './views/dashboard/dashboard.module#DashboardModule',
                    // },
                    {
                        path: 'media',
                        loadChildren: './views/media/media.module#MediaModule'
                    },
                    {
                        path: 'user',
                        loadChildren: './views/user/user.module#UserModule'
                    },
                    /**
                     * Resource routes
                     */
                    {
                        path: 'resource',
                        loadChildren: './views/resource/resource.module#ResourceModule'
                    }
                ]
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

// @dynamic
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [PermissionGuard]
})
export class AdminRoutingModule {
}
