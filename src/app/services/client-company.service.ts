import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ClientCompanyLink {
  CompanyCode: string;
  ClientCode: string;
  InvestingAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientCompanyService {
  //private apiUrl = 'http://localhost:3000/api/clientcompany';
  //private apiUrl = 'investmentmanagement-investment-backend-api-production.up.railway.app/api/clientcompany';
  

  constructor(private http: HttpClient) {}

  create(link: ClientCompanyLink): Observable<any> {
    //return this.http.post(`${this.apiUrl}`, link);
    return this.http.post(`${environment.apiUrl}/api/clientcompany`,link);
  }

  update(companyCode: string, clientCode: string, payload: Partial<ClientCompanyLink>): Observable<any> {
    //return this.http.put(`${this.apiUrl}/${companyCode}/${clientCode}`, payload);
    return this.http.put(`${environment.apiUrl}/api/clientcompany`,payload);
  }

  delete(companyCode: string, clientCode: string): Observable<any> {
    //return this.http.delete(`${this.apiUrl}/${companyCode}/${clientCode}`);
    return this.http.delete(`${environment.apiUrl}/api/clientcompany/${clientCode}`);
  }

  getAll(): Observable<ClientCompanyLink[]> {
    //return this.http.get<ClientCompanyLink[]>(this.apiUrl);
    return this.http.get<ClientCompanyLink[]>(`${environment.apiUrl}/api/clientcompany`);
    
  }

  getByCompanyAndClient(companyCode: string, clientCode: string): Observable<ClientCompanyLink> {
    //return this.http.get<ClientCompanyLink>(`${this.apiUrl}/${companyCode}/${clientCode}`);
    return this.http.get<ClientCompanyLink>(`${environment.apiUrl}/api/clientcompany/${clientCode}`);
  }
}
