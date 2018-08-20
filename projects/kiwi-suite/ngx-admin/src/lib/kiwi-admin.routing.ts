import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/auth/login/login.component';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { AccountComponent } from './views/account/account.component';
import { PageComponent } from './views/page/page.component';
import { TranslationComponent } from './views/translation/translation.component';
import { TranslationListComponent } from './views/translation/list/translation-list.component';
import { TranslationEditComponent } from './views/translation/edit/translation-edit.component';
import { PermissionGuard } from './guards/permission.guard';
import { MediaComponent } from './views/media/media.component';
import { ResourceComponent } from './views/resource/resource.component';
import { ResourceCreateComponent } from './views/resource/create/resource-create.component';
import { ResourceEditComponent } from './views/resource/edit/resource-edit.component';
import { PageCreateComponent } from './views/page/create/page-create.component';
import { PageAddComponent } from './views/page/add/page-add.component';
import { PageEditComponent } from './views/page/edit/page-edit.component';

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
    canActivate: [PermissionGuard],
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
            data: {title: null},
          },
          {
            path: 'create/:locale',
            component: PageCreateComponent,
            data: {title: 'Create Page'},
          },
          {
            path: 'create/:locale/:parentSitemapId',
            component: PageCreateComponent,
            data: {title: 'Create Page'},
          },
          {
            path: 'add/:locale/:sitemapId',
            component: PageAddComponent,
            data: {title: 'Add Page'},
          },
          {
            path: ':id/edit',
            component: PageEditComponent,
            data: {title: 'Edit Page'},
          }
        ],
      },
      {
        path: 'media',
        data: {title: 'Media'},
        children: [
          {
            path: '',
            component: MediaComponent,
            data: {title: null},
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
            data: {title: null},
          },
          {
            path: 'catalogue/:catalogue',
            data: {title: 'Catalogue'},
            children: [
              {
                path: '',
                component: TranslationListComponent,
                data: {title: null},
              },
              {
                path: ':id/edit',
                component: TranslationEditComponent,
                data: {title: 'Edit Translation'},
              },
            ],
          },
        ],
      },
      {
        path: 'resource/:type',
        data: {title: '{resource}'},
        children: [
          {
            path: '',
            component: ResourceComponent,
            data: {title: null},
          },
          {
            path: 'create',
            component: ResourceCreateComponent,
            data: {title: 'Create'},
          },
          {
            path: ':id/edit',
            component: ResourceEditComponent,
            data: {title: 'Edit'},
          },
        ],
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
