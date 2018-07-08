import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleLayoutComponent} from './containers/simple-layout';
import {AuthRoutingModule} from './views/auth';
import {PageNotFoundComponent} from './views/errors';
import {ResourceIndexComponent, ResourceEditComponent} from './views/resource';
import {UserIndexComponent} from "./views/user/user-index.component";
import {PermissionGuard} from "./views/auth/guards/permission.guard";
import {FullLayoutComponent} from "./containers/full-layout/full-layout.component";
import {AccountComponent} from "./views/account/account.component";
import {ResourceCreateComponent} from "./views/resource/resource-create.component";
import {MediaIndexComponent} from "./views/media/media-index.component";
import {PageIndexComponent} from "./views/page/page-index.component";
import {PageCreateComponent} from "./views/page/page-create.component";
import {PageEditComponent} from "./views/page/page-edit.component";

export const routes: Routes = [
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
            {
                path: 'account',
                component: FullLayoutComponent,
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Account'
                        },
                        children: [
                            {
                                path: '',
                                component: AccountComponent,
                                data: {
                                    title: 'Settings',
                                },
                            }
                        ],
                    },
                ],
            },
            {
                path: 'admin-user',
                component: FullLayoutComponent,
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Users'
                        },
                        children: [
                            {
                                path: '',
                                component: UserIndexComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'List'
                                },
                            },
                            {
                                path: 'create',
                                component: ResourceCreateComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Create User',
                                    resource: 'admin-user',
                                }
                            },
                            {
                                path: ':id/edit',
                                component: ResourceEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Edit User',
                                    resource: 'admin-user',
                                }
                            }
                        ]
                    },
                ]
            },
            {
                path: 'resource/:type',
                component: FullLayoutComponent,
                children: [
                    {
                        path: '',
                        data: {
                            title: '%resources'
                        },
                        children: [
                            {
                                path: '',
                                component: ResourceIndexComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'List'
                                },
                            },
                            {
                                path: 'create',
                                component: ResourceCreateComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Create %resource'
                                },
                            },
                            {
                                path: ':id/edit',
                                component: ResourceEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Edit %resource'
                                },
                            }
                        ],
                    },
                ],
            },
            {
                path: 'media',
                component: FullLayoutComponent,
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Media'
                        },
                        children: [
                            {
                                path: '',
                                component: MediaIndexComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'List',
                                },
                            }
                        ]
                    },
                ]
            },
            {
                path: 'page',
                component: FullLayoutComponent,
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Page'
                        },
                        children: [
                            {
                                path: '',
                                component: PageIndexComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'List',
                                },
                            },
                            {
                                path: 'create/:locale',
                                component: PageCreateComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Create',
                                },
                            },
                            {
                                path: 'create/:locale/:parentSitemapId',
                                component: PageCreateComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Create',
                                },
                            },
                            {
                                path: ':id/edit',
                                component: PageEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Edit',
                                },
                            }
                        ]
                    },
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
    imports: [
        /**
         * import feature routing modules here to have their routes registered
         */
        AuthRoutingModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
