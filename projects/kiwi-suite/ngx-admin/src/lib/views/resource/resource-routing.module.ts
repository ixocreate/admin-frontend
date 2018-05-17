import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from '../../permission.guard';
import {ResourceDetailComponent} from './resource-detail.component';
import {ResourceEditComponent} from './resource-edit.component';
import {ResourceListComponent} from './resource-list.component';

const routes: Routes = [
    {
        path: ':type/create',
        component: ResourceEditComponent,
        canLoad: [PermissionGuard],
        data: {
            action: 'create',
            title: 'Create'
        },
        // resolve: {
        //     tag: ResourceResolver,
        // },
    },
    {
        path: ':type/:id/edit',
        component: ResourceEditComponent,
        canLoad: [PermissionGuard],
        data: {
            action: 'edit',
            title: 'Edit'
        },
        // resolve: {
        //     tag: ResourceResolver,
        // },
    },
    {
        path: ':type/:id',
        component: ResourceDetailComponent,
        canLoad: [PermissionGuard],
        data: {
            title: 'Detail'
        },
        // resolve: {
        //     tag: ResourceResolver,
        // },
    },
    {
        path: ':type',
        component: ResourceListComponent,
        canLoad: [PermissionGuard],
        data: {
            title: 'Resources'
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
