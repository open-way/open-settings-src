import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesComponent } from './modules.component';

/*const titles = require('./modules-titles.json');*/

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'setup-system',
        loadChildren: () => import('./setup-system/setup-system.module').then(m => m.SetupSystemModule),
      },
      {
        path: 'setup-profile',
        loadChildren: () => import('./setup-profile/setup-profile.module').then(m => m.SetupProfileModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule { }
