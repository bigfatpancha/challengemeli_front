import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DescriptionResponseData, ItemsResponseData } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://localhost:4200/api/';
  headers: HttpHeaders = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }


  doGetItems(query: string): Observable<ItemsResponseData> {
    const params = new HttpParams().set('search', query);
    return this.http.get<ItemsResponseData>(`${this.url}/items`, {headers: this.headers, params: params});
  }

  doGetDescription(id: string): Observable<DescriptionResponseData> {
    return this.http.get<DescriptionResponseData>(`${this.url}/item/${id}`, {headers: this.headers});
  }
}
