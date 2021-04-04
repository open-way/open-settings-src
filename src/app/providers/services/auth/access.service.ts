import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
} from 'rxjs';
import { IResponse } from '../../utils';

/**
 * Access => Accesos que el Usuario tiene.
 */
@Injectable()
export class AccessService {
  // private url = 'user-modules';
  private url = 'modulos';

  constructor(private http: HttpClient) { }

  // public getModules$(): Observable<IResponse> {
  //   return this.http.get<IResponse>(this.url);
  // }

  public getActionsByModuloCodigo$(moduloCodigo: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}/${moduloCodigo}/modulo-accions`);
  }
  // public getChildrenOfIdModule$(idModule: number): Observable<IResponse> {
  //   return this.http.get<IResponse>(`${this.url}/${idModule}/children`);
  // }
}
