import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupProfileRoutingModule } from './setup-profile-routing.module';
import { SetupProfileComponent } from './setup-profile.component';

@NgModule({
  declarations: [SetupProfileComponent],
  imports: [
    CommonModule,
    SetupProfileRoutingModule
  ]
})
export class SetupProfileModule { }
