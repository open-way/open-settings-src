import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityDataService } from '../../utils';

@Injectable({ providedIn: 'root' })
export class UsersService extends EntityDataService<any>{
    // private endPoint = 'users';
    constructor(protected httpClient: HttpClient) {
        super(httpClient, 'users');
    }

    // public getAll$(): Observable<any> {
    //     return this.httpClient.get<any>(this.endPoint);
    // }

    // public getByQuery$(query: any): Observable<any> {
    //     return this.httpClient.get<any>(this.endPoint, { params: query });
    // }

    // public getById$(id: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${id}`);
    // }

    // public add$(data: any): Observable<any> {
    //     return this.httpClient.post<any>(this.endPoint, data);
    // }

    // public addExiste$(data: any): Observable<any> {
    //     return this.httpClient.post<any>(`${this.endPoint}/existe`, data);
    // }

    public updateOnlyEmail$(id: any, data: any): Observable<any> {
        return this.httpClient.put<any>(`${this.endPoint}/${id}/onlyemail`, data);
    }

    public verificationNotification$(id: any, data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/${id}/verification-notification`, data);
    }

    // public delete$(id: any): Observable<any> {
    //     return this.httpClient.delete<any>(`${this.endPoint}/${id}`);
    // }

    public activate$(id: any, data: any): Observable<any> {
        return this.httpClient.put<any>(`${this.endPoint}/${id}/activate`, data);
    }

    public addRolsById$(id: any, data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/${id}/rols`, data);
    }

    public getRolsById$(id: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/${id}/rols`);
    }

    public passswordRequest$(id: any, data: any): Observable<any> {
        return this.httpClient.put<any>(`${this.endPoint}/${id}/passsword-request`, data);
    }


    // public getAsignarJerarquiaAllByUserId$(userId: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${userId}/asignar-jerarquia-all`);
    // }

    // public getAsignarUnions$(userId: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${userId}/asignar-unions`);
    // }

    // public addAsignarUnions$(userId: any, data: any): Observable<any> {
    //     return this.httpClient.post<any>(`${this.endPoint}/${userId}/asignar-unions`, data);
    // }

    // public deleteAsignarUnions$(userId: any, unionId: any): Observable<any> {
    //     return this.httpClient.delete<any>(`${this.endPoint}/${userId}/asignar-unions/${unionId}`);
    // }

    // public updateAsignarUnions$(userId: any, unionId: any, data: any): Observable<any> {
    //     return this.httpClient
    //         .put<any>(`${this.endPoint}/${userId}/asignar-unions/${unionId}`, data);
    // }


    // public getAsignarMisionAsociacions$(userId: any, unionId: string): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${userId}/asignar-mision-asociacions/${unionId}`);
    // }

    // public addAsignarMisionAsociacions$(userId: any, data: any): Observable<any> {
    //     return this.httpClient.post<any>(`${this.endPoint}/${userId}/asignar-mision-asociacions`, data);
    // }

    // public deleteAsignarMisionAsociacions$(userId: any, misionAsociacionId: any): Observable<any> {
    //     return this.httpClient.delete<any>(`${this.endPoint}/${userId}/asignar-mision-asociacions/${misionAsociacionId}`);
    // }

    // public updateAsignarMisionAsociacions$(userId: any, misionAsociacionId: any, data: any): Observable<any> {
    //     return this.httpClient
    //         .put<any>(`${this.endPoint}/${userId}/asignar-mision-asociacions/${misionAsociacionId}`, data);
    // }


    // public getAsignarDistritoMisioneros$(userId: any, misionAsociacionId: string): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${userId}/asignar-distrito-misioneros/${misionAsociacionId}`);
    // }

    // public addAsignarDistritoMisioneros$(userId: any, data: any): Observable<any> {
    //     return this.httpClient.post<any>(`${this.endPoint}/${userId}/asignar-distrito-misioneros`, data);
    // }

    // public deleteAsignarDistritoMisioneros$(userId: any, distritoMisioneroId: any): Observable<any> {
    //     return this.httpClient.delete<any>(`${this.endPoint}/${userId}/asignar-distrito-misioneros/${distritoMisioneroId}`);
    // }

    // public updateAsignarDistritoMisioneros$(userId: any, distritoMisioneroId: any, data: any): Observable<any> {
    //     return this.httpClient
    //         .put<any>(`${this.endPoint}/${userId}/asignar-distrito-misioneros/${distritoMisioneroId}`, data);
    // }


    // public getAsignarIglesias$(userId: any, distritoMisioneroId: string): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${userId}/asignar-iglesias/${distritoMisioneroId}`);
    // }

    // public addAsignarIglesias$(userId: any, data: any): Observable<any> {
    //     return this.httpClient.post<any>(`${this.endPoint}/${userId}/asignar-iglesias`, data);
    // }

    // public deleteAsignarIglesias$(userId: any, iglesiaId: any): Observable<any> {
    //     return this.httpClient.delete<any>(`${this.endPoint}/${userId}/asignar-iglesias/${iglesiaId}`);
    // }

    // public updateAsignarIglesias$(userId: any, iglesiaId: any, data: any): Observable<any> {
    //     return this.httpClient
    //         .put<any>(`${this.endPoint}/${userId}/asignar-iglesias/${iglesiaId}`, data);
    // }

}
