import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable()
export class StateService {

    protected sidebars: any = [
        {
            name: 'Left Sidebar',
            icon: 'nb-layout-sidebar-left',
            id: 'left',
            selected: true,
        },
        {
            name: 'Right Sidebar',
            icon: 'nb-layout-sidebar-right',
            id: 'right',
        },
    ];

    protected sidebarState$ = new BehaviorSubject(this.sidebars[0]);

    constructor() { }

    public onSidebarState(): Observable<any> {
        return this.sidebarState$.asObservable();
    }

    public getSidebarStates(): Observable<any[]> {
        return of(this.sidebars);
    }

    public setSidebarState(state: any): any {
        this.sidebarState$.next(state);
    }
}
