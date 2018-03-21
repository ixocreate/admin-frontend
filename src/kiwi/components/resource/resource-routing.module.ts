import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourceDetailComponent} from './resource-detail.component';
import {ResourceEditComponent} from './resource-edit.component';
import {ResourceListComponent} from './resource-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Resources'
        },
        children: [
            {
                path: '',
                component: ResourceListComponent,
                data: {
                    title: 'Resources',
                },
            },
            {
                path: ':id/edit',
                component: ResourceEditComponent,
                data: {
                    title: 'Resource'
                },
                // resolve: {
                //     tag: ResourceResolver,
                // },
            },
            {
                path: ':id',
                component: ResourceDetailComponent,
                data: {
                    title: 'Resource'
                },
                // resolve: {
                //     tag: ResourceResolver,
                // },
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
