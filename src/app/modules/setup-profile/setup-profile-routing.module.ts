import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupProfileComponent } from './setup-profile.component';

const routes: Routes = [
  {
    path: '',
    component: SetupProfileComponent,
    children: [
      {
        path: 'my-profile',
        loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-profile',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupProfileRoutingModule { }
