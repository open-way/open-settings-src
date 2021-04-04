import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbCheckboxModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbThemeModule, NbDialogModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { AutorizationGuardService, StoreUserActionsService, ManageAutorizationService } from '@providers/guards';
// import { AccessService } from '@providers/services';
import { SearchComponent, InputIconComponent, ConfirmModalComponent, } from './components';
import { AutorizationGuardService, StoreUserActionsService, ManageAutorizationService } from 'src/app/providers/guards';
import { AccessService } from 'src/app/providers/services';
// import {
//   LambButtonBackModule, LambInputIconModule,
//   LambConfirmDialogModule, LambButtonIconModule,
//   LambShowErrorModule, LambFieldsetModule,
// } from 'lamb-web-lib';

const COMPONENTS: any[] = [
  SearchComponent,
  InputIconComponent,
  ConfirmModalComponent,
];

const NB_MODULES: any[] = [
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbSpinnerModule,
  NbButtonModule,
  NbDialogModule.forRoot({ closeOnBackdropClick: false, closeOnEsc: false }),
];

const ANGULAR_MODULES: any[] = [
  ReactiveFormsModule,
  FormsModule,
  CommonModule,

  // NbThemeModule.forRoot({ name: 'default' }),

];

@NgModule({
  imports: [
    ...NB_MODULES,
    ...ANGULAR_MODULES,
  ],
  exports: [
    ...NB_MODULES,
    ...ANGULAR_MODULES,
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    AutorizationGuardService,
    StoreUserActionsService,
    ManageAutorizationService,

    AccessService,
  ],
})
export class SharedModule { }
