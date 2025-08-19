import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scheme } from '../models/scheme.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {
  private apiUrl = 'http://localhost:3000/api/schemes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Scheme[]> {
    return this.http.get<Scheme[]>(this.apiUrl);
  }

  create(scheme: Scheme): Observable<any> {
    return this.http.post(this.apiUrl, scheme);
  }

  update(code: string, scheme: Scheme): Observable<any> {
    return this.http.put(`${this.apiUrl}/${code}`, scheme);
  }

  delete(code: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${code}`);
  }
}
