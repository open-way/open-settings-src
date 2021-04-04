import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

// class Action {
//     public acceso: string;
//     public clave: string;
//     public id_modulo: string;
//     public id_rol: string;
//     public metodo: string;
//     public rol: string;
// }

@Injectable()
export class StoreUserActionsService {

    private state: any = {
        userActions: [],
    };

    private userActions$ = new ReplaySubject<any[]>(1);

    constructor() { }

    public getUserActions$(): Observable<any[]> {
        return this.userActions$.asObservable();
    }

    public setUserActions(actions: any[]) {
        if (actions.length) {
            this.state.userActions = actions;
        } else {
            this.state.userActions = [];
        }
        this.userActions$.next(this.state.userActions);
    }
}

