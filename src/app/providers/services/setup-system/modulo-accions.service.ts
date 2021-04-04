import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { EntityDataService } from '../../utils';

@Injectable({ providedIn: 'root' })
export class ModuloAccionsService extends EntityDataService<any> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient, 'modulo-accions');
    }

    // public getParentsChildsSidenav$(module_code): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/parents-childs-sidenav/${module_code}`);
    // }

    // public getParents$(): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/parents`);
    // }

    // public getParentsChilds$(): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/parents-childs`);
    // }

}
