import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import {
  ListaGeneralComponent,
  FormEditarModalComponent, FormNuevoModalComponent, FormManageRolesModalComponent, UserMainComponent,
} from './components';
import {
  NbCardModule, NbDialogModule, NbRadioModule,
  NbSpinnerModule, NbCheckboxModule, NbButtonModule,
  NbInputModule, NbTooltipModule, NbIconModule, NbAlertModule, NbUserModule, NbFormFieldModule, NbListModule, NbAutocompleteModule, NbAccordionModule,
} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService, PersonasService } from 'src/app/providers/services';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserComponentsModule } from '../../setup-shared/user-components/user-components.module';
import { SharedModule } from '../../shared/shared.module';

const SERVICES: any[] = [
  UsersService,
  PersonasService,
];

const COMPONENTS: any[] = [
  UsuariosComponent,
  ListaGeneralComponent,
  FormEditarModalComponent,
  FormNuevoModalComponent,
  FormManageRolesModalComponent,
  UserMainComponent,
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
  NbAccordionModule,
  NbUserModule,
  // NbDatepickerModule,
  // NbProgressBarModule,
  // NbTabsetModule,
  NbAutocompleteModule,
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
    UsuariosRoutingModule,
    UserComponentsModule,
    NgxPaginationModule,
    SharedModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class UsuariosModule { }
