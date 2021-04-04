import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private endPoint = 'auth';
    constructor(private httpClient: HttpClient) { }

    public login$(credentials: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/login`, credentials);
    }

    public logout$(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/logout`);
    }
    public user$(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/user`);
    }

    public passswordRequest$(id: any, data: any): Observable<any> {
        return this.httpClient.put<any>(`${this.endPoint}/user/${id}/passsword-request`, data);
    }

    public forgotPassword$(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/forgot-password`, data);
    }

    public resetPassword$(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/reset-password`, data);
    }

    public persona$(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/persona`);
    }

    public enterprise$(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/enterprise`);
    }

    public signup$(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/signup`, data);
    }
}
