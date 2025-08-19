import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse'; // ✅ Correct default import
import { Client } from '../../models/client.model'; // Adjust path as needed
import { Transaction } from '../../models/transaction.model'; // Your model
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,FormsModule } from '@angular/forms';


@Component({
  selector: 'app-transaction-import',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // ⬅️ Add these
  templateUrl: './transaction-import.component.html' ,
  styleUrls: ['./transaction.import.component.css'],
})
export class TransactionImportComponent implements OnInit {
  parsedTransactions: any[] = [];
  clients: Client[] = [];
  successCount = 0;
  errorCount = 0;
  resultLogs: { row: number, status: string, message: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.http.get<Client[]>('http://localhost:3000/api/clients').subscribe({
      next: (data) => (this.clients = data),
      error: (err) => console.error('Client load error', err),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.parsedTransactions = result.data;
        },
      });
    }
  }

  importOneByOne() {
    this.successCount = 0;
    this.errorCount = 0;
    this.resultLogs = [];  

    this.parsedTransactions.forEach((t, index) => {
        
            const bankAccount = t.DepositBankAccountNo || t.WithdrawalBankAccountNo;
            const matchedClient = this.clients.find(
              c =>
                c.DepositBankAccountNo === bankAccount ||
                c.WithdrawalBankAccountNo === bankAccount
            );
        
      const transaction: Transaction = {
        TransactionCode: '', // let server auto-generate
        ClientCode: matchedClient?.ClientCode || 'UNKNOWN',
        CompanyCode: t.CompanyCode,
        SchemeCode: t.SchemeCode,
        TransactionDate: t.TransactionDate,
        Amount: +t.Amount,
        CreditDebit: t.CreditDebit,
        TransactionType: t.TransactionType,
        IsReturnComplete: t.IsReturnComplete === '1' ? 1 : 0,
        Remarks: t.Remarks,
      };
  
      this.http.post('http://localhost:3000/api/transactions', transaction).subscribe({
        next: () => {
          this.successCount++;
          this.resultLogs.push({ row: index + 1, status: 'Success', message: 'Imported successfully' });
        },
        error: (err) => {
          this.errorCount++;
          const msg = err.status === 409 ? 'Duplicate - already imported' : 'Error during import';
          this.resultLogs.push({ row: index + 1, status: 'Failed', message: msg });
        }
      });
    });
  }
}
