import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from '../../containers/full-layout';
import {PermissionGuard} from '../auth/guards';
import {SitemapCreateComponent} from './sitemap-create.component';
import {SitemapEditComponent} from './sitemap-edit.component';
import {SitemapIndexComponent} from './sitemap-index.component';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home',
        },
        children: [
            {
                path: 'sitemap',
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Sitemap'
                        },
                        children: [
                            {
                                path: '',
                                component: SitemapIndexComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'List',
                                },
                            },
                            {
                                path: 'create/:locale',
                                component: SitemapCreateComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Create',
                                    action: 'create',
                                },
                            },
                            {
                                path: 'create/:locale/:parentSitemapId',
                                component: SitemapCreateComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Create',
                                    action: 'create',
                                },
                            },
                            {
                                path: 'edit/:id',
                                component: SitemapEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Edit',
                                    action: 'edit',
                                },
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
export class SitemapRoutingModule {
}
