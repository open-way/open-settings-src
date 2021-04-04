import { Injectable, Inject } from '@angular/core';
import { TOKEN_OPEN_OAUTH_STORE, OauthStore } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class OpenOAuthStoreService {
    constructor(
        @Inject(TOKEN_OPEN_OAUTH_STORE) protected tokenOpenOauthStore: OauthStore,
    ) {
    }

    public setAccessToken(accessToken: string) {
        localStorage.setItem(this.tokenOpenOauthStore.accessToken, accessToken);
    }

    public getAccessToken() {
        return localStorage.getItem(this.tokenOpenOauthStore.accessToken);
    }

    public setUsername(username: string) {
        localStorage.setItem(this.tokenOpenOauthStore.username, username);
    }

    public getUsername() {
        return localStorage.getItem(this.tokenOpenOauthStore.username);
    }

    public clearAll() {
        localStorage.removeItem(this.tokenOpenOauthStore.accessToken);
    }

}
