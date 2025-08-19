import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { CompanyService } from '../../services/company.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  transactions: any[] = [];

  companies: any[] = [];
  clients: any[] = [];
  schemes: any[] = [];

  isEditing: boolean = false;

  filters = {
    TransactionCode: '',
    ClientCode: '',
    CompanyCode: '',
    SchemeCode:'',
    TransactionDate:'',
    Amount:'',
    TransactionType:''
  };

  constructor(private fb: FormBuilder,
              private transactionService: TransactionService,
              private companyService: CompanyService,
              private clientService: ClientService
              ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      TransactionCode: ['', Validators.required],
      ClientCode: ['', Validators.required],
      CompanyCode: ['', Validators.required],
      SchemeCode: ['', Validators.required],
      TransactionDate: ['', Validators.required],
      Amount: ['', Validators.required],
      CreditDebit: ['', Validators.required],
      TransactionType: ['', Validators.required],
      IsReturnComplete: [0],
      Remarks: ['']
    });

    this.loadDropdownData();
    this.loadTransactions();
  }

  loadDropdownData() {
    //this.http.get<any[]>('http://localhost:3000/api/companies').subscribe(data => this.companies = data);
    this.companyService.getAll().subscribe(data => this.companies = data);
    this.clientService.getAll().subscribe(data => this.clients = data);
    this.companyService.getAll().subscribe(data => this.schemes = data);
    //this.http.get<any[]>('http://localhost:3000/api/clients').subscribe(data => this.clients = data);
    //this.http.get<any[]>('http://localhost:3000/api/schemes').subscribe(data => this.schemes = data);
  }


  
  loadTransactions() {
    this.transactionService.getAll().subscribe(data => {
      this.transactions = data;
    });
  }

  saveTransaction() {
      console.log("save Transactions");
    const transaction: Transaction = this.transactionForm.value;
    if (this.isEditing) {
      this.transactionService.update(transaction).subscribe(() => {
        this.loadTransactions();
        this.cancelEdit();
      });
    } else {
      this.transactionService.create(transaction).subscribe(() => {
        this.loadTransactions();
        this.transactionForm.reset();
      });
    }
  }

  editTransaction(transaction: Transaction) {
    this.transactionForm.patchValue(transaction);
    this.isEditing = true;
  }

  deleteTransaction(code: string) {
    this.transactionService.delete(code).subscribe(() => {
      this.loadTransactions();
    });
  }

  cancelEdit() {
    this.transactionForm.reset();
    this.isEditing = false;
  }

  filteredLinks() {
    return this.transactions?.filter(link =>
      (!this.filters.TransactionCode || link.TransactionCode?.toLowerCase().includes(this.filters.TransactionCode.toLowerCase())) &&
      (!this.filters.ClientCode || link.ClientCode?.toLowerCase().includes(this.filters.ClientCode.toLowerCase())) &&
      (!this.filters.CompanyCode || link.CompanyCode?.toString().includes(this.filters.CompanyCode.toLowerCase()))&&
      (!this.filters.TransactionDate || link.TransactionDate?.toLowerCase().includes(this.filters.TransactionDate.toLowerCase())) &&
      (!this.filters.Amount || link.Amount?.toLowerCase().includes(this.filters.Amount.toLowerCase())) &&
      (!this.filters.TransactionType || link.TransactionType?.toString().includes(this.filters.TransactionType.toLowerCase()))
    );
  }
}

  /*

  loadTransactions() {
    this.http.get<any[]>('http://localhost:3000/api/transactions').subscribe(data => {
      this.transactions = data;
    });
  }

  saveTransaction() {
      console.log('11');
    if (this.transactionForm.invalid) return;
    console.log('22');

    this.http.post('http://localhost:3000/api/transactions', this.transactionForm.value).subscribe(() => {
      alert('Transaction saved');
      this.transactionForm.reset();
      this.loadTransactions();
    });
  }

  cancelEdit() {
    this.transactionForm.reset();
    this.isEditing = false;
  }
  
  editTransaction(transaction: Transaction) {
    this.transactionForm.patchValue(transaction);
    this.isEditing = true;
  }
  
  deleteTransaction(code: string) {
    this.http.delete(`http://localhost:3000/api/transactions/${code}`).subscribe(() => {
      this.loadTransactions();
    });
  }
}
*/