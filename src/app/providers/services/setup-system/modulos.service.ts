import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityDataService } from '../../utils';

@Injectable()
export class ModulosService extends EntityDataService<any> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient, 'modulos');
    }

    public getParentsChildsSidenav$(moduleCode: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/parents-childs-sidenav/${moduleCode}`);
    }

    public getParents$(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/parents`);
    }

    public getParentsChilds$(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/parents-childs`);
    }

}
