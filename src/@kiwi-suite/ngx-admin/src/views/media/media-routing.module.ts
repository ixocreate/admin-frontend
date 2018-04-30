import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MediaEditComponent} from './media-edit.component';
import {MediaListComponent} from './media-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Media'
        },
        children: [
            {
                path: '',
                component: MediaListComponent,
                data: {
                    title: 'Media',
                },
            },
            {
                path: 'create',
                component: MediaEditComponent,
                data: {
                    title: 'Media',
                    action: 'create',
                }
            },
            {
                path: ':id/edit',
                component: MediaEditComponent,
                data: {
                    title: 'Media',
                    action: 'edit',
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MediaRoutingModule {
}
