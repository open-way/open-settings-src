import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemModulesComponent } from './system-modules.component';
import { ListaGeneralComponent } from './components';
import { AutorizationGuardService } from 'src/app/providers/guards';

const routes: Routes = [
  {
    path: '',
    component: SystemModulesComponent,
    data: {
      // module: '01010204',
    },
    canActivate: [
      AutorizationGuardService,
    ],
    children: [
      {
        path: '',
        component: ListaGeneralComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemModulesRoutingModule { }
