import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import {
  SendEmailVerifyPageComponent, UserDesactivePageComponent,
  UnauthorizedPageComponent, EmailVerifyPageComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'unauthorized-page',
        component: UnauthorizedPageComponent,
      },
      {
        path: 'email/verify',
        component: EmailVerifyPageComponent,
      },
      {
        path: 'send-email-verify-page',
        component: SendEmailVerifyPageComponent,
      },
      {
        path: 'user-desactive-page',
        component: UserDesactivePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
