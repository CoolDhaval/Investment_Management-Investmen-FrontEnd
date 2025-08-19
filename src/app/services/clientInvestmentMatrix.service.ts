import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getReport(clientCode: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/report/clierntReturnMatrix/${clientCode}`);
    //return this.http.get<any[]>(`investmentmanagement-investment-backend-api-production.up.railway.app/report/clierntReturnMatrix/${clientCode}`);    
    //return this.http.get<any[]>(`http://localhost:3000/report/clierntReturnMatrix/${clientCode}`);    
  }
}