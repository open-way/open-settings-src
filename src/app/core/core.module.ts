import { NgModule, LOCALE_ID } from '@angular/core';
import {
    MainPageComponent, HeaderComponent, IdentityEnterpriseComponent,
    SidebarContentComponent, SidebarFooterComponent,
    SidebarHeaderComponent,
    IdentityIasdLogoComponent,
    IdentityPeriodComponent,
} from './';
import {
    NbThemeModule, NbLayoutModule, NbCardModule,
    NbSidebarModule, NbMenuModule, NbUserModule, NbActionsModule,
    NbContextMenuModule, NbDialogModule, NbIconModule, NbButtonModule, NbSelectModule, NbSpinnerModule, NbDatepickerModule,
} from '@nebular/theme';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { ToastrModule } from 'ngx-toastr';
import { StateService } from './shared/state.service';
import { SharedModule } from '../modules/shared/shared.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChangeEnterpriseModalComponent } from './main-page/header/change-enterprise-modal/change-enterprise-modal.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
// import * as es from 'date-fns/locale/es';
// import { es } from 'date-fns/locale';

import { registerLocaleData } from '@angular/common';
import { TOKEN_OPEN_OAUTH_STORE, TOKEN_OPEN_CREDENTIALS_APP, TOKEN_OPEN_SHELL_APP_URL } from '../oauth/shared/utils';
import { ModulosService } from '../providers/services/setup-system/modulos.service';
import { AuthService } from '../providers/services';
import { environment } from 'src/environments/environment';
import localePt from '@angular/common/locales/es-PE';
registerLocaleData(localePt);

const BASE_MODULES: any[] = [
    CommonModule,
    RouterModule,

    SharedModule,
];

const NB_MODULES: any[] = [
    // NbThemeModule.forRoot({ name: 'lamb-default' }),
    NbThemeModule.forRoot({ name: 'lamb-sehs-primary' }),
    // NbThemeModule.forRoot({ name: 'default' }),
    // NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbCardModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot({ closeOnEsc: false, closeOnBackdropClick: false }),
    NbUserModule,
    NbActionsModule,
    NbContextMenuModule,

    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbSelectModule,
    NbSpinnerModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
        // parseOptions: { locale: es, awareOfUnicodeTokens: true },
        // formatOptions: { locale: es, awareOfUnicodeTokens: true },
        parseOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
        formatOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
        format: 'dd/MM/yyyy',
    }),
];

const CORE_COMPONENTS: any[] = [
    HeaderComponent,
    IdentityEnterpriseComponent,
    IdentityPeriodComponent,

    MainPageComponent,
    IdentityIasdLogoComponent,
    SidebarContentComponent,
    SidebarFooterComponent,
    SidebarHeaderComponent,

    ChangeEnterpriseModalComponent,
];

const LAMB_MODULES: any[] = [
    // LambMenuModule,
    // LambTitleModule.forRoot({ appName: 'Lamb Compras' }),
];

const PROVIDERS: any[] = [
    // { provide: TOKEN_LAMB_OAUTH_STORE, useValue: { accessToken: 'lamb-access-token', authorizationCode: 'lamb-authorization-code' } },
    // { provide: TOKEN_UPEU_OAUTH_STORE, useValue: { accessToken: 'upeu-access-token', authorizationCode: 'upeu-authorization-code' } },

    // { provide: TOKEN_LAMB_OAUTH_URL, useValue: environment.lambOAuthUrl },
    // { provide: TOKEN_UPEU_OAUTH_URL, useValue: environment.upeuOAuthUrl }, // ADD Change
    { provide: TOKEN_OPEN_CREDENTIALS_APP, useValue: environment.openClientCredentials },
    // { provide: TOKEN_LAMB_CREDENTIALS_APP, useValue: environment.lambClientCredentials },
    // { provide: TOKEN_UPEU_CREDENTIALS_APP, useValue: environment.upeuClientCredentials }, // ADD Change

    { provide: TOKEN_OPEN_SHELL_APP_URL, useValue: environment.openClientCredentials.shell_app_url },
    // { provide: TOKEN_LAMB_SHELL_APP_URL, useValue: environment.shellAppUrl },
    { provide: LOCALE_ID, useValue: 'es-PE' },

    // UsersThemesService,
    // MyDepartmentService,
    // MyEntityDepartmentsService, MyEntitiesService,
    { provide: TOKEN_OPEN_OAUTH_STORE, useValue: { accessToken: 'open-access-token', authorizationCode: 'open-authorization-code' } },
    AuthService,
    StateService,
    ModulosService,
];

@NgModule({
    imports: [
        ...BASE_MODULES,
        ...NB_MODULES,
        ...LAMB_MODULES,
        // ToastrModule.forRoot(),
    ],
    exports: [
        // ...NB_MODULES,
        HeaderComponent,
    ],
    declarations: [
        ...CORE_COMPONENTS,
    ],
    providers: [
        ...PROVIDERS,
    ],
    entryComponents: [
        // ChangeEnterpriseModalComponent,
    ],
})
export class CoreModule { }
