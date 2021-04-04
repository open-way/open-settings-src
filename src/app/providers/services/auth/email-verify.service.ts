import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailVerifyService {
    // private endPoint = 'auth/email';
    constructor(private httpClient: HttpClient, handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
    }

    public emailVerify$(url: any): Observable<any> {
        return this.httpClient.get<any>(url);
    }
}
