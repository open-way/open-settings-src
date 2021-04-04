import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { ListaGeneralComponent, ManageRolModulosComponent } from './components';
import { AutorizationGuardService } from 'src/app/providers/guards';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    data: {
      // module: '01010203',
    },
    canActivate: [
      AutorizationGuardService,
    ],
    children: [
      {
        path: '',
        component: ListaGeneralComponent,
      },
      {
        path: ':rolId/manage-rol-modulos',
        component: ManageRolModulosComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
