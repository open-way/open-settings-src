import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import {
  NbCardModule,
} from '@nebular/theme';
import { PersonaComponentsModule } from '../../setup-shared/persona-components/persona-components.module';
import { UserComponentsModule } from '../../setup-shared/user-components/user-components.module';

const COMPONENTS: any[] = [
  MyProfileComponent,
];

const NB_MODULES: any[] = [
  NbCardModule,
];

const NG_MODULES: any[] = [
  CommonModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...NB_MODULES,
    ...NG_MODULES,
    PersonaComponentsModule,
    UserComponentsModule,
    MyProfileRoutingModule,
  ],
})
export class MyProfileModule { }
