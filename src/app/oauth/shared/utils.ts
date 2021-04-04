import { InjectionToken } from '@angular/core';


export class OauthStore {
    username!: string;
    accessToken!: string;
    authorizationCode!: string;
}

export class CredentialsApp {
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    client_id!: string;
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    client_secret!: string;
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    redirect_uri!: string;
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    client_code!: string;
}

export const TOKEN_OPEN_OAUTH_STORE = new InjectionToken<OauthStore>('Open Oauth Store');
export const TOKEN_OPEN_CREDENTIALS_APP = new InjectionToken<CredentialsApp>('Open Credentials App');
export const TOKEN_OPEN_SHELL_APP_URL = new InjectionToken<String>('Open Shell App Url');
