import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    // {
    //     path: '',
    //     data: {
    //         title: 'Resources'
    //     },
    //     children: [
    //         {
    //             path: '',
    //             component: ResourceListComponent,
    //             data: {
    //                 title: 'Resources',
    //             },
    //         },
    //         {
    //             path: 'create',
    //             component: ResourceEditComponent,
    //             data: {
    //                 title: 'Resource',
    //                 action: 'create',
    //             },
    //             // resolve: {
    //             //     tag: ResourceResolver,
    //             // },
    //         },
    //         {
    //             path: ':id/edit',
    //             component: ResourceEditComponent,
    //             data: {
    //                 title: 'Resource',
    //                 action: 'edit',
    //             },
    //             // resolve: {
    //             //     tag: ResourceResolver,
    //             // },
    //         },
    //         {
    //             path: ':id',
    //             component: ResourceDetailComponent,
    //             data: {
    //                 title: 'Resource'
    //             },
    //             // resolve: {
    //             //     tag: ResourceResolver,
    //             // },
    //         }
    //     ]
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
