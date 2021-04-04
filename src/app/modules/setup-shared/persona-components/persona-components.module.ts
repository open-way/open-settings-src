import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    NbCardModule, NbSpinnerModule, NbDialogModule,
    NbCheckboxModule, NbRadioModule, NbButtonModule, NbIconModule, NbTooltipModule, NbInputModule, NbTabsetModule, NbAccordionModule, NbBadgeModule, NbListModule, NbSelectModule, NbFormFieldModule, NbDatepickerModule, NbToggleModule,
} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    ViewDocumentoModalComponent,
    FormPersonaDocumentoModalComponent,
    MainColRightComponent,
    FormPersonaTelefonoModalComponent, FormPersonaVirtualModalComponent,
    PersonaDireccionComponent, FormPersonaGeneralComponent,
} from './components';
import { GoogleMapsModule } from '@angular/google-maps'
import { SharedModule } from '../../shared/shared.module';

const COMPONENTS: any[] = [
    MainColRightComponent,
    ViewDocumentoModalComponent,
    FormPersonaDocumentoModalComponent,
    FormPersonaTelefonoModalComponent,
    FormPersonaVirtualModalComponent,
    PersonaDireccionComponent,
    FormPersonaGeneralComponent,
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
    NbTabsetModule,
    NbAccordionModule,
    NbBadgeModule,
    NbListModule,
    NbSelectModule,
    NbFormFieldModule,
    NbDatepickerModule,
    NbToggleModule,
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
        MainColRightComponent,
        FormPersonaGeneralComponent,
    ],
    imports: [
        ...NB_MODULES,
        ...NG_MODULES,
        SharedModule,
        GoogleMapsModule,
    ],
})
export class PersonaComponentsModule { }
