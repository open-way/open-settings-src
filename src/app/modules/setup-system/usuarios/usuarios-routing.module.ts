import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { ListaGeneralComponent, UserMainComponent } from './components';
import { AutorizationGuardService } from 'src/app/providers/guards';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    data: {
      module: '01010201',
    },
    canActivate: [
      AutorizationGuardService,
    ],
    children: [
      {
        path: '',
        component: ListaGeneralComponent
      },
      {
        path: ':id',
        component: UserMainComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
