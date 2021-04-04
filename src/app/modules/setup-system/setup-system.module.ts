import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupSystemRoutingModule } from './setup-system-routing.module';
import { SetupSystemComponent } from './setup-system.component';

@NgModule({
  declarations: [SetupSystemComponent],
  imports: [
    CommonModule,
    SetupSystemRoutingModule
  ]
})
export class SetupSystemModule { }
