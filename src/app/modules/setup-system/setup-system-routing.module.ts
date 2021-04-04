import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupSystemComponent } from './setup-system.component';

const routes: Routes = [
  {
    path: '',
    component: SetupSystemComponent,
    children: [
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
      },
      {
        path: 'personas',
        loadChildren: () => import('./personas/personas.module').then(m => m.PersonasModule),
      },
      {
        path: 'system-modules',
        loadChildren: () => import('./system-modules/system-modules.module').then(m => m.SystemModulesModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupSystemRoutingModule { }
