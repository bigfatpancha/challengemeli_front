import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemsResponseData } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://localhost:4200/api/items';
  headers: HttpHeaders = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  hello(): Observable<string> {
    return this.http.get<string>('http://localhost:4200/api/hello', {headers: this.headers});
  }

  doGetItems(query: string): Observable<ItemsResponseData> {
    const params = new HttpParams().set('search', query);
    return this.http.get<ItemsResponseData>(`${this.url}`, {headers: this.headers, params: params});
  }

  doGetDescription(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.url}/${id}`, {headers: this.headers});
  }
}
