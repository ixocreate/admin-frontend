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
import {PageFlatIndexComponent} from "./views/page-flat/page-flat-index.component";
import {PageFlatCreateComponent} from "./views/page-flat/page-flat-create.component";
import {PageAddComponent} from "./views/page/page-add.component";

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
                        children: [
                            {
                                path: '',
                                component: AccountComponent
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
                        children: [
                            {
                                path: '',
                                component: UserIndexComponent,
                                canActivate: [PermissionGuard]
                            },
                            {
                                path: 'create',
                                component: ResourceCreateComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    resource: 'admin-user',
                                }
                            },
                            {
                                path: ':id/edit',
                                component: ResourceEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
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
                        children: [
                            {
                                path: '',
                                component: ResourceIndexComponent,
                                canActivate: [PermissionGuard]
                            },
                            {
                                path: 'create',
                                component: ResourceCreateComponent,
                                canActivate: [PermissionGuard]
                            },
                            {
                                path: ':id/edit',
                                component: ResourceEditComponent,
                                canActivate: [PermissionGuard]
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
                        children: [
                            {
                                path: '',
                                component: MediaIndexComponent,
                                canActivate: [PermissionGuard]
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
                        children: [
                            {
                                path: '',
                                component: PageIndexComponent,
                                canActivate: [PermissionGuard]
                            },
                            {
                                path: 'create/:locale',
                                component: PageCreateComponent,
                                canActivate: [PermissionGuard]
                            },
                            {
                                path: 'create/:locale/:parentSitemapId',
                                component: PageCreateComponent,
                                canActivate: [PermissionGuard]
                            },
                            {
                                path: 'add/:locale/:sitemapId',
                                component: PageAddComponent,
                                canActivate: [PermissionGuard],
                            },
                            {
                                path: ':id/edit',
                                component: PageEditComponent,
                                canActivate: [PermissionGuard]
                            }
                        ]
                    },
                ]
            },
            {
                path: 'page-flat/:handle',
                component: FullLayoutComponent,
                children: [
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                component: PageFlatIndexComponent,
                                canActivate: [PermissionGuard],
                            },
                            {
                                path: 'create/:locale/:parentSitemapId',
                                component: PageFlatCreateComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Create',
                                },
                            },
                            {
                                path: ':id/edit',
                                component: PageEditComponent,
                                canActivate: [PermissionGuard],
                            }
                        ],
                    },
                ],
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
