import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreUserActionsService } from './store-user-actions.service';

@Injectable()
export class ManageAutorizationService {
    // public actions: any[];

    constructor(private storeUserActionsService: StoreUserActionsService) { }

    public loadActions$(): Observable<any> {
        return this.storeUserActionsService.getUserActions$();
    }

    public haveAction(userActions: any[], action: string): boolean {
        return userActions.some(act => act.llave === action);

    }

    public isAutorizedInit(): Observable<boolean> {
        return this.loadActions$()
            // .pipe(map((userActions) => this.haveAction(userActions, 'SELECT')));
            .pipe(map((userActions) => this.haveAction(userActions, 'INIT')));
    }
    /**
     * Metodo que indica si esta o no autorizado.
     * @param action name of actions Ejm 'SELECT'.
     * @returns {boolean}
     */
    public isAutorized(action: string): Observable<boolean> {
        return this.loadActions$()
            .pipe(map((userActions) => this.haveAction(userActions, action)));
    }
}
