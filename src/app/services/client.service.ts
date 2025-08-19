import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //private apiUrl = 'http://localhost:3000/api/clients';
  //private apiUrl = 'investmentmanagement-investment-backend-api-production.up.railway.app/api/clients';
  

  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    //return this.http.get<Client[]>(this.apiUrl);
    return this.http.get<Client[]>(`${environment.apiUrl}/api/clients`);
  }

  getClientById(clientCode: string): Observable<Client> {
    //return this.http.get<Client>(`${this.apiUrl}/${clientCode}`);
    return this.http.get<Client>(`${environment.apiUrl}/api/clients/${clientCode}`);
  }

  create(client: Client): Observable<Client> {
    //return this.http.post<Client>(this.apiUrl, client);
    return this.http.post<Client>(`${environment.apiUrl}/api/clients`,client);
  }

  update(client: Client): Observable<Client> {
    //return this.http.put<Client>(this.apiUrl, client);
    return this.http.put<Client>(`${environment.apiUrl}/api/clients`,client);
  }

  delete(clientCode: string): Observable<any> {
    //return this.http.delete(`${this.apiUrl}/${clientCode}`);
    return this.http.delete(`${environment.apiUrl}/api/clients/${clientCode}`);
  }
}
