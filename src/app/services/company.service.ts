import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  //private apiUrl = 'http://localhost:3000/api/companies';
  //private apiUrl = 'investmentmanagement-investment-backend-api-production.up.railway.app/api/companies';
  

  constructor(private http: HttpClient) {}

  getAll(): Observable<Company[]> {
    console.log('called Company get A;; Service');
    return this.http.get<Company[]>(`${environment.apiUrl}/api/companies`);
    
    //return this.http.get<Company[]>(this.apiUrl);
  }

  create(company: Company): Observable<any> {
    console.log('called Company create Service');
    //return this.http.post(this.apiUrl, company);
    return this.http.post(`${environment.apiUrl}/api/companies`,company);
  }

 
  update(company: Company): Observable<any> {
    console.log('called Company update Service');
    //return this.http.put(this.apiUrl, company);
    return this.http.put(`${environment.apiUrl}/api/companies`,company);
  }

  delete(code: string): Observable<any> {
    console.log('called Company delete Service');
    //return this.http.delete(`${this.apiUrl}/${code}`);
    return this.http.delete(`${environment.apiUrl}/api/companies/${code}`);
  }
}
