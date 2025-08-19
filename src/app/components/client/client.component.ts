import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {ReactiveFormsModule,FormsModule } from '@angular/forms';
//import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  standalone: true, // Required for Angular standalone components
  imports: [CommonModule, ReactiveFormsModule,FormsModule],//, HttpClientModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientForm!: FormGroup;
  clients: Client[] = [];
  isEditing = false;

  filters = {
    ClientCode: '',
    ClientName: '',
    ContactNo: '',
    PANNo:'',
    AadharNo:'',
    DepositBankAccountNo:'',
    WithdrawalBankAccountNo:''
  }; 

  constructor(private fb: FormBuilder,  private clientService: ClientService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClients();
  }

  initForm() {
    this.clientForm = this.fb.group({
      ClientCode: [''],
      ClientName: [''],
      ContactNo: [''],
      PANNo: [''],
      AadharNo: [''],
      DepositBankName: [''],
      DepositBankAccountNo: [''],
      DepositBankIFSCCode: [''],
      WithdrawalBankName: [''],
      WithdrawalBankAccountNo: [''],
      WithdrawalBankIFSCCode: ['']
    });
  }


  loadClients() {
    this.clientService.getAll().subscribe(data => {
      this.clients = data;
    });
  }

  saveClient() {
      console.log("save Client");
    const client: Client = this.clientForm.value;
    if (this.isEditing) {
      this.clientService.update(client).subscribe(() => {
        this.loadClients();
        this.cancelEdit();
      });
    } else {
      this.clientService.create(client).subscribe(() => {
        this.loadClients();
        this.clientForm.reset();
      });
    }
  }

  editClient(client: Client) {
    this.clientForm.patchValue(client);
    this.isEditing = true;
  }

  deleteClient(code: string) {
    this.clientService.delete(code).subscribe(() => {
      this.loadClients();
    });
  }

  cancelEdit() {
    this.clientForm.reset();
    this.isEditing = false;
  }

filteredLinks() {
  return this.clients?.filter(link =>
    (!this.filters.ClientCode || link.ClientCode?.toLowerCase().includes(this.filters.ClientCode.toLowerCase())) &&
    (!this.filters.ClientName || link.ClientName?.toLowerCase().includes(this.filters.ClientName.toLowerCase())) &&
    (!this.filters.ContactNo || link.ContactNo?.toString().includes(this.filters.ContactNo.toLowerCase()))&&
    (!this.filters.PANNo || link.PANNo?.toLowerCase().includes(this.filters.PANNo.toLowerCase())) &&
    (!this.filters.AadharNo || link.AadharNo?.toLowerCase().includes(this.filters.AadharNo.toLowerCase())) &&
    (!this.filters.DepositBankAccountNo || link.DepositBankAccountNo?.toString().includes(this.filters.DepositBankAccountNo.toLowerCase()))&&
    (!this.filters.WithdrawalBankAccountNo || link.WithdrawalBankAccountNo?.toString().includes(this.filters.WithdrawalBankAccountNo.toLowerCase()))
  );
 }
}

