import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from '../../containers/full-layout';
import {PermissionGuard} from '../auth/guards';
import {ResourceDetailComponent} from './resource-detail.component';
import {ResourceEditComponent} from './resource-edit.component';
import {ResourceListComponent} from './resource-list.component';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home',
        },
        children: [
            {
                path: 'resource/:type',
                children: [
                    {
                        path: '',
                        data: {
                            title: '%resources'
                        },
                        children: [
                            {
                                path: '',
                                component: ResourceListComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'List'
                                },
                            },
                            {
                                path: 'create',
                                component: ResourceEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    action: 'create',
                                    title: 'Create %resource'
                                },
                                // resolve: {
                                //     model: ResourceResolver,
                                // },
                            },
                            {
                                path: ':id/edit',
                                component: ResourceEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    action: 'edit',
                                    title: 'Edit %resource'
                                },
                                // resolve: {
                                //     model: ResourceResolver,
                                // },
                            },
                            {
                                path: ':id',
                                component: ResourceDetailComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: '%resource Detail'
                                },
                                // resolve: {
                                //     model: ResourceResolver,
                                // },
                            },
                        ],
                    },
                ],
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourceRoutingModule {
}
