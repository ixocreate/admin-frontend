import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from '../../containers/full-layout';
import {PermissionGuard} from '../auth/guards';
import {MediaEditComponent} from './media-edit.component';
import {MediaIndexComponent} from './media-index.component';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home',
        },
        children: [
            {
                path: 'media',
                children: [
                    {
                        path: '',
                        data: {
                            title: 'Media'
                        },
                        children: [
                            {
                                path: '',
                                component: MediaIndexComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'List',
                                },
                            },
                            {
                                path: 'create',
                                component: MediaEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Media',
                                    action: 'create',
                                }
                            },
                            {
                                path: ':id/edit',
                                component: MediaEditComponent,
                                canActivate: [PermissionGuard],
                                data: {
                                    title: 'Media',
                                    action: 'edit',
                                }
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
export class MediaRoutingModule {
}
