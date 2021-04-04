import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityDataService } from '../../utils';

@Injectable({ providedIn: 'root' })
export class UbigeosService extends EntityDataService<any> {
    constructor(protected httpClient: HttpClient) {
        super(httpClient, 'ubigeos');
    }

    public getByParentId$(parentId: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/${parentId}/childs`);
    }

    // public getDepartamentos$(idPais: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${idPais}/deptos`);
    // }
    // public getProvincias$(idPais: any, idDepto: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${idPais}/deptos/${idDepto}/provs`);
    // }
    // public getDistritos$(idPais: any, idDepto: any, idProv: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${idPais}/deptos/${idDepto}/provs/${idProv}/ditts`);
    // }
}
