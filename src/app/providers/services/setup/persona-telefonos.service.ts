import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityDataService } from '../../utils';

@Injectable({ providedIn: 'root' })
export class PersonaTelefonosService extends EntityDataService<any> {
    constructor(protected httpClient: HttpClient) {
        super(httpClient, 'persona-telefonos');
    }
}
