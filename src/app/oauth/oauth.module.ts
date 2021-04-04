import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthRoutingModule } from './oauth-routing.module';
import { OauthComponent } from './oauth.component';
import { LoginComponent, SignupComponent, RequestPasswordComponent, ResetPasswordComponent } from './components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbSpinnerModule, NbCardModule, NbCheckboxModule,
  NbLayoutModule, NbInputModule, NbButtonModule, NbIconModule, NbAlertModule,
} from '@nebular/theme';
// import { CoreModule } from '../core/core.module';
import { AuthService } from '../providers/services';

const COMPONENTS: any[] = [
  OauthComponent,
  LoginComponent,
  SignupComponent,
  RequestPasswordComponent,
  ResetPasswordComponent,
];

const NG_MODULES: any[] = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
];

const NB_MODULES: any[] = [
  NbCardModule,
  NbSpinnerModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,

  NbLayoutModule,
  NbAlertModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...NG_MODULES,
    ...NB_MODULES,
    OauthRoutingModule,
  ],
  providers: [
    AuthService,
  ]
})
export class OauthModule { }
