import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas.component';
import {
  ListaGeneralComponent,
  FormEditarModalComponent, FormNuevoModalComponent, PersonaMainComponent,
} from './components';
import {
  NbCardModule, NbDialogModule, NbRadioModule,
  NbSpinnerModule, NbCheckboxModule, NbButtonModule,
  NbInputModule, NbTooltipModule, NbIconModule, NbAlertModule, NbUserModule, NbFormFieldModule, NbListModule, NbBadgeModule,
} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService, PersonasService } from 'src/app/providers/services';
import { NgxPaginationModule } from 'ngx-pagination';
import { PersonaComponentsModule } from '../../setup-shared/persona-components/persona-components.module';
import { SharedModule } from '../../shared/shared.module';

const SERVICES: any[] = [
  UsersService,
  PersonasService,
];

const COMPONENTS: any[] = [
  PersonasComponent,
  ListaGeneralComponent,
  FormEditarModalComponent,
  FormNuevoModalComponent,
  PersonaMainComponent,
];

const NB_MODULES: any[] = [
  NbCardModule,
  NbDialogModule.forChild({ closeOnBackdropClick: false, closeOnEsc: false }),
  NbRadioModule,
  NbSpinnerModule,
  NbCheckboxModule,
  NbButtonModule,
  NbInputModule,
  NbTooltipModule,
  NbIconModule,
  NbAlertModule,
  NbUserModule,
  NbListModule,
  NbFormFieldModule,
  NbBadgeModule,
  // NgbTypeaheadModule,
];

const NG_MODULES: any[] = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...NG_MODULES,
    ...NB_MODULES,
    PersonasRoutingModule,
    NgxPaginationModule,
    PersonaComponentsModule,
    SharedModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class PersonasModule { }
