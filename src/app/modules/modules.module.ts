import { NgModule } from '@angular/core';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';

@NgModule({
  imports: [
    ModulesRoutingModule,
  ],
  declarations: [ModulesComponent],
})
export class ModulesModule { }
