import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RolModulosService {
    private endPoint = 'rol-modulos';
    constructor(private httpClient: HttpClient) { }

    public getParentsChilds$(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/parents-childs`);
    }

    public add$(data: any): Observable<any> {
        return this.httpClient.post<any>(this.endPoint, data);
    }

    public deleteByRolIdAndModuloId$(rolModuloId: any, query: any): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${rolModuloId}`, { params: query });
    }

    public delete$(id: any): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${id}`);
    }

}
