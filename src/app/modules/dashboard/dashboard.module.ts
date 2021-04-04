import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './components/main/main.component';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

const NB_MODULES: any[] = [
  NbCardModule,
  NbSpinnerModule,
];

const SERVICES: any[] = [
];

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
  ],
  imports: [
    DashboardRoutingModule,
    NB_MODULES,
    SharedModule,
    CommonModule,
    GoogleMapsModule,
    // HttpClientModule,
    // HttpClientJsonpModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DashboardModule { }
