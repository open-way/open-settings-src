import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    NbCardModule, NbSpinnerModule, NbDialogModule,
    NbCheckboxModule, NbRadioModule, NbButtonModule, NbIconModule,
    NbTooltipModule, NbInputModule,
    NbBadgeModule, NbListModule, NbSelectModule, NbFormFieldModule, NbToggleModule, NbAlertModule,
} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    FormChangePasswordModalComponent,
    MainColLeftComponent,
    DesactiveUserModalComponent,
    UpdateUserEmailModalComponent,
} from './components';
import { SharedModule } from '../../shared/shared.module';

const COMPONENTS: any[] = [
    MainColLeftComponent,
    DesactiveUserModalComponent,
    FormChangePasswordModalComponent,
    UpdateUserEmailModalComponent,
];

const NB_MODULES: any[] = [
    NbCardModule,
    NbDialogModule.forChild({ closeOnBackdropClick: false, closeOnEsc: false }),
    NbRadioModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbInputModule,
    NbBadgeModule,
    NbListModule,
    NbSelectModule,
    NbFormFieldModule,
    NbToggleModule,
    NbAlertModule,
];

const NG_MODULES: any[] = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
];

@NgModule({
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        MainColLeftComponent,
    ],
    imports: [
        ...NB_MODULES,
        ...NG_MODULES,
        SharedModule,
    ],
})
export class UserComponentsModule { }
