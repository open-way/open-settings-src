import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {
  NbCardModule,
  NbButtonModule, NbIconModule, NbTooltipModule, NbLayoutModule,
  NbAlertModule, NbUserModule, NbActionsModule,
} from '@nebular/theme';
import { SharedModule } from '../modules/shared/shared.module';
import {
  UnauthorizedPageComponent,
  EmailVerifyPageComponent, HeaderPageComponent, SendEmailVerifyPageComponent,
  UserDesactivePageComponent,
} from './components';

const NB_MODULES: any[] = [
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,

  NbLayoutModule,
  NbAlertModule,
  NbUserModule,
  NbActionsModule,
];

const SERVICES: any[] = [
];

@NgModule({
  declarations: [
    PagesComponent,
    UnauthorizedPageComponent,
    EmailVerifyPageComponent,
    SendEmailVerifyPageComponent,
    HeaderPageComponent,
    UserDesactivePageComponent,
  ],
  imports: [
    PagesRoutingModule,
    NB_MODULES,
    SharedModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class PagesModule { }
