import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from '../../permission.guard';
import {ResourceDetailComponent} from './resource-detail.component';
import {ResourceEditComponent} from './resource-edit.component';
import {ResourceListComponent} from './resource-list.component';

const routes: Routes = [
    {
        path: ':type',
        canLoad: [PermissionGuard],
        children: [
            {
                path: '',
                canLoad: [PermissionGuard],
                data: {
                    title: 'Resources'
                },
                children: [
                    {
                        path: '',
                        component: ResourceListComponent,
                        canLoad: [PermissionGuard],
                        data: {
                            title: ''
                        },
                    },
                    {
                        path: 'create',
                        component: ResourceEditComponent,
                        canLoad: [PermissionGuard],
                        data: {
                            action: 'create',
                            title: 'Create Resource'
                        },
                        // resolve: {
                        //     tag: ResourceResolver,
                        // },
                    },
                    {
                        path: ':id/edit',
                        component: ResourceEditComponent,
                        canLoad: [PermissionGuard],
                        data: {
                            action: 'edit',
                            title: 'Edit Resource'
                        },
                        // resolve: {
                        //     tag: ResourceResolver,
                        // },
                    },
                    {
                        path: ':id',
                        component: ResourceDetailComponent,
                        canLoad: [PermissionGuard],
                        data: {
                            title: 'Resource Detail'
                        },
                        // resolve: {
                        //     tag: ResourceResolver,
                        // },
                    },
                ],
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
