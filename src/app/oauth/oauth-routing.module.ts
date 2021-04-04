import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OauthComponent } from './oauth.component';
import { LoginComponent, SignupComponent, RequestPasswordComponent, ResetPasswordComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: OauthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OauthRoutingModule { }
