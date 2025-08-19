import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  create(transaction: Transaction): Observable<any> {   
    return this.http.post(this.apiUrl, transaction);
  }

  update(transaction: Transaction): Observable<any> {   
    return this.http.put(this.apiUrl, transaction);
  }
  
  delete(code: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/transactions/${code}`);
  }
  
}
