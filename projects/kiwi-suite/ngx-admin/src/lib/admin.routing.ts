import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleLayoutComponent} from './containers/simple-layout';
import {AccountRoutingModule} from './views/account';
import {AuthRoutingModule} from './views/auth';
import {DashboardRoutingModule} from './views/dashboard';
import {PageNotFoundComponent} from './views/errors';
import {MediaRoutingModule} from './views/media';
import {ResourceRoutingModule} from './views/resource';
import {SitemapRoutingModule} from './views/sitemap';
import {UserRoutingModule} from './views/user';

export const routes: Routes = [
    {
        path: '',
        component: SimpleLayoutComponent,
        children: [
            // {
            //     path: 'auth',
            //     loadChildren: './views/auth/auth.module#AuthModule',
            // },
            // {
            //     path: '',
            //     component: FullLayoutComponent,
            //     data: {
            //         title: 'Home',
            //     },
            //     children: [
            //         /**
            //          * Default routes
            //          */
            //         {
            //             path: 'account',
            //             loadChildren: './views/account/account.module#AccountModule',
            //             pathMatch: 'prefix',
            //         },
            //         {
            //             path: 'dashboard',
            //             loadChildren: './views/dashboard/dashboard.module#DashboardModule',
            //         },
            //         {
            //             path: 'media',
            //             loadChildren: './views/media/media.module#MediaModule',
            //             pathMatch: 'prefix',
            //         },
            //         {
            //             path: 'user',
            //             loadChildren: './views/user/user.module#UserModule',
            //             pathMatch: 'prefix',
            //         },
            //         /**
            //          * Resource routes
            //          */
            //         {
            //             path: 'resource',
            //             loadChildren: './views/resource/resource.module#ResourceModule',
            //             pathMatch: 'prefix',
            //         }
            //     ]
            // },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        /**
         * import feature routing modules here to have their routes registered
         */
        AccountRoutingModule,
        AuthRoutingModule,
        DashboardRoutingModule,
        MediaRoutingModule,
        ResourceRoutingModule,
        UserRoutingModule,
        SitemapRoutingModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
