import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemModulesRoutingModule } from './system-modules-routing.module';
import { SystemModulesComponent } from './system-modules.component';
import {
  ListaGeneralComponent, FormEditarModalComponent,
  FormNuevoModalComponent, AccionesModalComponent,
} from './components';
import { NbCardModule, NbDialogModule, NbSpinnerModule, NbCheckboxModule, NbRadioModule, NbButtonModule, NbIconModule, NbTooltipModule, NbInputModule, NbSelectModule, NbAlertModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModulosService } from 'src/app/providers/services';


const SERVICES: any[] = [
  ModulosService,
];

const COMPONENTS: any[] = [
  SystemModulesComponent,
  ListaGeneralComponent,

  FormEditarModalComponent,
  FormNuevoModalComponent,
  AccionesModalComponent,
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
  NbSelectModule,
  NbAlertModule,
  // NbDatepickerModule,
  // NbProgressBarModule,
  // NbTabsetModule,

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
    ...NB_MODULES,
    ...NG_MODULES,
    SystemModulesRoutingModule,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [
    FormEditarModalComponent,
    FormNuevoModalComponent,
  ],
})
export class SystemModulesModule { }
