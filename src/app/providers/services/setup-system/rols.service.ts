import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityDataService } from '../../utils';

@Injectable()
export class RolsService extends EntityDataService<any>{

    constructor(protected httpClient: HttpClient) {
        super(httpClient, 'rols');
    }

    public activate$(id: any, data: any): Observable<any> {
        return this.httpClient.put<any>(`${this.endPoint}/${id}/activate`, data);
    }

    // Modulos
    public getModulosAll$(rolId: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/${rolId}/modulos`);
    }

    public addModulos$(rolId: any, data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/${rolId}/modulos`, data);
    }

    public getAcciones$(rolId: any, moduloId: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/${rolId}/modulos/${moduloId}/acciones`);
    }

    public addAcciones$(rolId: any, moduloId: any, data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/${rolId}/modulos/${moduloId}/acciones`, data);
    }


}
