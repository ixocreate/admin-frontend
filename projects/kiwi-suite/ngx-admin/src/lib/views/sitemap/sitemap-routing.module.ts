import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from '../../containers/full-layout';
import {PermissionGuard} from '../auth/guards';
import {SitemapListComponent} from "./sitemap-list.component";

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Sitemap',
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
