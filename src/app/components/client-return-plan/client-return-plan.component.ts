import { Component, OnInit } from '@angular/core';
import { ClientReturnPlanService } from '../../services/client-return-plan.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-return-plan',
  templateUrl: './client-return-plan.component.html',
  styleUrls: ['./client-return-plan.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // ⬅️ Add these
})
export class ClientReturnPlanComponent implements OnInit {
  plans: any[] = [];
  editForm!: FormGroup;
  editingId: number | null = null;

  filters = {
    ClientName: '',
    CompanyName: '',
    PaymentDate: '',
    InterestAmount:'',
    PrincipalAmount:'',
    Remarks:'',
    Received:'',
    ReceivedDate:'',
    TransactionNo:'',
    ReceivedRemarks:''
  }; 


  constructor(
    private returnPlanService: ClientReturnPlanService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
        Received: [false],         // default false
        ReceiveDate: [''],         // default empty
        transactionNo: [''],       // default empty
        receiveRemrks: ['']        // default empty
      });
    this.loadPlans(''); // Example client code
  }

  loadPlans(clientCode: string) {
    this.returnPlanService.getPlans(clientCode).subscribe(data => {
      this.plans = data;
    });
  }
/*
  editPlan(plan: any) {
    this.editingId = plan.ReturnId;
    this.editForm = this.fb.group({
      Received: [plan.Received],
      ReceiveDate: [plan.ReceiveDate],
      transactionNo: [plan.transactionNo],
      receiveRemrks: [plan.receiveRemrks]
    });
  }
*/
editPlan(plan: any) {
    this.editingId = plan.ReturnId;
    this.editForm.patchValue({
      Received: plan.Received,
      ReceiveDate: plan.ReceiveDate ? plan.ReceiveDate.split('T')[0] : '',
      transactionNo: plan.transactionNo,
      receiveRemrks: plan.receiveRemrks
    });
  }
  savePlan() {
    if (this.editingId !== null) {
      this.returnPlanService.updatePlan(this.editingId, this.editForm.value)
        .subscribe(() => {
          alert('Plan updated successfully');
          this.editingId = null;
          this.loadPlans('');
        });
    }
  }

  cancelEdit() {
    this.editingId = null;
  }



  filteredLinks() {
    return this.plans?.filter(link =>
      (!this.filters.ClientName || link.ClientName?.toLowerCase().includes(this.filters.ClientName.toLowerCase())) &&
      (!this.filters.CompanyName || link.CompanyName?.toLowerCase().includes(this.filters.CompanyName.toLowerCase())) &&
      (!this.filters.PaymentDate || link.PaymentDate?.toString().includes(this.filters.PaymentDate.toLowerCase()))&&
      (!this.filters.InterestAmount || link.InterestAmount?.toLowerCase().includes(this.filters.InterestAmount.toLowerCase())) &&
      (!this.filters.PrincipalAmount || link.PrincipalAmount?.toLowerCase().includes(this.filters.PrincipalAmount.toLowerCase())) &&
      (!this.filters.Remarks || link.Remarks?.toString().includes(this.filters.Remarks.toLowerCase()))&&
      (!this.filters.ReceivedDate || link.ReceivedDate?.toString().includes(this.filters.ReceivedDate.toLowerCase()))&&
      (!this.filters.TransactionNo || link.TransactionNo?.toString().includes(this.filters.TransactionNo.toLowerCase()))&&
      (!this.filters.ReceivedRemarks || link.ReceivedRemarks?.toString().includes(this.filters.ReceivedRemarks.toLowerCase()))
    );
   }
}
