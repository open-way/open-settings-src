import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas.component';
import { ListaGeneralComponent, PersonaMainComponent } from './components';
import { AutorizationGuardService } from 'src/app/providers/guards';

const routes: Routes = [
  {
    path: '',
    component: PersonasComponent,
    data: {
      module: '01010202',
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
        path: ':persona_id',
        component: PersonaMainComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
