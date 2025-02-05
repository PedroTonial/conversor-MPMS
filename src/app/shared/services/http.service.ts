import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transacao } from '../interfaces/transacao';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private endpoint: string = `${environment.firebaseConfig.databaseURL}`;

  postTransacao(transacao: Transacao | null): Observable<any> {
    return this.http.post(`${this.endpoint}/conversoes.json`, transacao);
  }

  getTransacao(): Observable<{ [key: string]: Transacao }> {
    return this.http.get<{ [key: string]: Transacao }>(
      `${this.endpoint}/conversoes.json`
    );
  }

  patchTaxa(taxaRecebida: number): Observable<any> {
    const taxaObject = {
      taxa: taxaRecebida,
    };
    return this.http.patch(`${this.endpoint}/taxa-conversao.json`, taxaObject);
  }

  getTaxa(): Observable<{ taxa: number }> {
    return this.http.get<{ taxa: number }>(
      `${this.endpoint}/taxa-conversao.json`
    );
  }
}
