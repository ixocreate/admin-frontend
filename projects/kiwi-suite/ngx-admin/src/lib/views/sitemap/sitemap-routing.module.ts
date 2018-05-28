import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from '../../containers/full-layout';
import {PermissionGuard} from '../auth/guards';
import {SitemapListComponent} from './sitemap-list.component';
import {SitemapCreateComponent} from "./sitemap-create.component";

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
                                component: SitemapListComponent,
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
