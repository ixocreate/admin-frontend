import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/auth/login/login.component';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { AccountComponent } from './views/account/account.component';
import { PageComponent } from './views/page/page.component';
import { TranslationComponent } from './views/translation/translation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: '', redirectTo: 'account', pathMatch: 'full'},
      {
        path: 'account',
        component: AccountComponent,
        data: {title: 'Account'},
      },
      {
        path: 'page',
        data: {title: 'Sitemap'},
        children: [
          {
            path: '',
            component: PageComponent,
          },
        ],
      },
      {
        path: 'translation',
        data: {title: 'Translation'},
        children: [
          {
            path: '',
            component: TranslationComponent,
          },
          /*
          {
            path: 'catalogue/:catalogue',
            component: TranslationIndexComponent,
            canActivate: [PermissionGuard]
          },
          {
            path: 'catalogue/:catalogue/:id/edit',
            component: TranslationEditComponent,
            canActivate: [PermissionGuard],
          }
          */
        ]
      },
      /*
      {
        path: 'admin-user',
        component: FullLayoutComponent,
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: UserIndexComponent,
                canActivate: [PermissionGuard]
              },
              {
                path: 'create',
                component: ResourceCreateComponent,
                canActivate: [PermissionGuard],
                data: {
                  resource: 'admin-user',
                }
              },
              {
                path: ':id/edit',
                component: ResourceEditComponent,
                canActivate: [PermissionGuard],
                data: {
                  resource: 'admin-user',
                }
              }
            ]
          },
        ]
      },
      {
        path: 'resource/:type',
        component: FullLayoutComponent,
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: ResourceIndexComponent,
                canActivate: [PermissionGuard]
              },
              {
                path: 'create',
                component: ResourceCreateComponent,
                canActivate: [PermissionGuard]
              },
              {
                path: ':id/edit',
                component: ResourceEditComponent,
                canActivate: [PermissionGuard]
              }
            ],
          },
        ],
      },
      {
        path: 'media',
        component: FullLayoutComponent,
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: MediaIndexComponent,
                canActivate: [PermissionGuard]
              }
            ]
          },
        ]
      },
      {
        path: 'page',
        component: FullLayoutComponent,
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: PageIndexComponent,
                canActivate: [PermissionGuard]
              },
              {
                path: 'create/:locale',
                component: PageCreateComponent,
                canActivate: [PermissionGuard]
              },
              {
                path: 'create/:locale/:parentSitemapId',
                component: PageCreateComponent,
                canActivate: [PermissionGuard]
              },
              {
                path: 'add/:locale/:sitemapId',
                component: PageAddComponent,
                canActivate: [PermissionGuard],
              },
              {
                path: ':id/edit',
                component: PageEditComponent,
                canActivate: [PermissionGuard]
              }
            ]
          },
        ]
      },
      {
        path: 'translation',
        component: FullLayoutComponent,
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: TranslationCatalogueComponent,
                canActivate: [PermissionGuard]
              },
              {
                path: 'catalogue/:catalogue',
                component: TranslationIndexComponent,
                canActivate: [PermissionGuard]
              },
              {
                path: 'catalogue/:catalogue/:id/edit',
                component: TranslationEditComponent,
                canActivate: [PermissionGuard],
              }
            ]
          },
        ]
      },
      {
        path: 'page-flat/:handle',
        component: FullLayoutComponent,
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                component: PageFlatIndexComponent,
                canActivate: [PermissionGuard],
              },
              {
                path: 'create/:locale/:parentSitemapId',
                component: PageFlatCreateComponent,
                canActivate: [PermissionGuard],
                data: {
                  title: 'Create',
                },
              },
              {
                path: 'add/:locale/:sitemapId',
                component: PageFlatAddComponent,
                canActivate: [PermissionGuard],
              },
              {
                path: ':id/edit',
                component: PageEditComponent,
                canActivate: [PermissionGuard],
              }
            ],
          },
        ],
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
      */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class KiwiAdminRouting {
}
