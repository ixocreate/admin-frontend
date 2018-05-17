import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './containers/full-layout';
import {SimpleLayoutComponent} from './containers/simple-layout';
import {PermissionGuard} from './permission.guard';
import {AccountComponent} from './views/account/account.component';
import {LoginComponent} from './views/auth/login/login.component';
import {ResetComponent} from './views/auth/reset/reset.component';
import {PageNotFoundComponent} from './views/errors/page-not-found/page-not-found.component';
import {MediaListComponent} from './views/media/media-list.component';
import {ResourceModule} from './views/resource';
import {UserEditComponent} from './views/user/user-edit.component';
import {UserListComponent} from './views/user/user-list.component';

// Do not delete. Used to ensure Module is loaded in the same bundle.
// Referencing the function directly in `loadChildren` breaks AoT compiler.
export function loadResourceModule() {
    return ResourceModule;
}

export const routes: Routes = [
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
            {
                path: 'auth',
                // lazy load module
                // sync load module (will not work wth AoT)
                // loadChildren: () => AuthModule
                // loadChildren: '../@kiwi-suite/ngx-admin/views/auth/auth.module#AuthModule'
                children: [
                    {
                        path: 'login',
                        component: LoginComponent,
                        data: {
                            title: 'Login'
                        }
                    },
                    {
                        path: 'reset',
                        component: ResetComponent,
                        data: {
                            title: 'Reset Password'
                        }
                    }
                ]
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
                        // loadChildren: './views/account/account.module#AccountModule',
                        canLoad: [PermissionGuard],
                        component: AccountComponent,
                        data: {
                            title: 'Account'
                        },
                    },
                    // {
                    //     path: 'dashboard',
                    //     loadChildren: './views/dashboard/dashboard.module#DashboardModule',
                    //     canActivate: [PermissionGuard],
                    // },
                    {
                        path: 'media',
                        canLoad: [PermissionGuard],
                        data: {
                            title: 'Media'
                        },
                        children: [
                            {
                                path: '',
                                component: MediaListComponent,
                                data: {
                                    title: 'Media',
                                },
                            },
                            // {
                            //     path: 'create',
                            //     component: MediaEditComponent,
                            //     data: {
                            //         title: 'Media',
                            //         action: 'create',
                            //     },
                            // },
                            // {
                            //     path: ':id/edit',
                            //     component: MediaEditComponent,
                            //     data: {
                            //         title: 'Media',
                            //         action: 'edit',
                            //     },
                            // },
                        ]
                    },
                    {
                        path: 'user',
                        // loadChildren: './views/user/user.module#UserModule',
                        canLoad: [PermissionGuard],
                        data: {
                            title: 'Users'
                        },
                        children: [
                            {
                                path: '',
                                component: UserListComponent,
                                // data: {
                                //     title: 'Users',
                                // },
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
                    /**
                     * Resource routes
                     */
                    {
                        path: 'resource',
                        loadChildren: './views/resource/resource.module#ResourceModule'
                        //     children: [
                        //         {
                        //             path: ':type/create',
                        //             component: ResourceEditComponent,
                        //             canLoad: [PermissionGuard],
                        //             data: {
                        //                 action: 'create',
                        //             },
                        //         },
                        //         {
                        //             path: ':type/:id/edit',
                        //             component: ResourceEditComponent,
                        //             canLoad: [PermissionGuard],
                        //             data: {
                        //                 action: 'edit',
                        //             },
                        //         },
                        //         {
                        //             path: ':type',
                        //             component: ResourceListComponent,
                        //             canLoad: [PermissionGuard],
                        //         },
                        //     ]
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
