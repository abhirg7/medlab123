import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:3000/';
  httpHeaders = new HttpHeaders({
    'content-type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getDataFromServer(endpoint: string) {
    const url = this.baseUrl + endpoint;
    return this.http.get(url, { headers: this.httpHeaders });
  }
}
