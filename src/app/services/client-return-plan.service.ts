import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientReturnPlanService {
  //private baseUrl = 'http://localhost:3000/api/client-return-plan';
  private baseUrl = 'investmentmanagement-investment-backend-api-production.up.railway.app/api/client-return-plan';
  

  constructor(private http: HttpClient) {}

  // Get all plans for a client
  getPlans(clientCode: string): Observable<any[]> {
    //return this.http.get<any[]>(`${this.baseUrl}?clientCode=${clientCode}`);
    return this.http.get<any[]>(`${environment.apiUrl}/api/client-return-plan?clientCode=${clientCode}`);
  }

  // Update specific plan entry
  updatePlan(returnId: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${returnId}`, payload);
  }
}
