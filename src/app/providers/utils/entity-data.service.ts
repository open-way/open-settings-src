import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';

export class EntityDataService<T> {

    constructor(
        protected httpClient: HttpClient,
        // protected endPoint: HttpClient,
        @Inject(String) protected endPoint: string,
    ) { }

    public getAll$(): Observable<T> {
        return this.httpClient.get<T>(this.endPoint);
    }

    public getByQuery$(params: any): Observable<T> {
        return this.httpClient.get<T>(this.endPoint, { params });
    }

    public getById$(id: string): Observable<T> {
        return this.httpClient.get<T>(`${this.endPoint}/${id}/`);
    }

    public add$(entity: T): Observable<T> {
        return this.httpClient.post<T>(this.endPoint, entity);
    }

    public update$(id: string, entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.endPoint}/${id}/`, entity);
    }

    public delete$(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${id}/`);
    }

    public updateWithFile$(id: string, entity: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/${id}/`, entity);
    }
}
