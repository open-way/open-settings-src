import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import {
  ListaGeneralComponent, FormEditarModalComponent,
  FormNuevoModalComponent, ManageRolModulosComponent, AsignarAccionesModalComponent,
} from './components';
import {
  NbCardModule, NbSpinnerModule, NbDialogModule,
  NbCheckboxModule, NbRadioModule, NbButtonModule, NbIconModule, NbTooltipModule, NbInputModule, NbListModule, NbFormFieldModule, NbBadgeModule,
} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RolModulosService, RolsService } from 'src/app/providers/services';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';

const SERVICES: any[] = [
  RolsService,
  RolModulosService,
];

const COMPONENTS: any[] = [
  RolesComponent,
  ListaGeneralComponent,
  FormEditarModalComponent,
  FormNuevoModalComponent,
  ManageRolModulosComponent,
  AsignarAccionesModalComponent,
];

const NB_MODULES: any[] = [
  NbCardModule,
  NbDialogModule.forChild({ closeOnBackdropClick: false, closeOnEsc: false }),
  NbRadioModule,
  NbSpinnerModule,
  NbCheckboxModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbInputModule,
  NbListModule,
  NbFormFieldModule,
  NbBadgeModule,
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
    ...NB_MODULES,
    ...NG_MODULES,
    RolesRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [
    FormEditarModalComponent,
    FormNuevoModalComponent,
  ],
})
export class RolesModule { }
