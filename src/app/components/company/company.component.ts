import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

type InterestFrequency = 'Upfront' | 'Monthly' | 'Quarterly';
type InterestMonths = 'NA' | 'All' | 'Quarterly';
type PrincipalRepayment = 'Fortnightly' |'Monthly'|'Quarterly'| 'OnMaturity';


const frequencyMap: Record<InterestFrequency, number> = {
  Upfront: 1,
  Monthly: 2,
  Quarterly: 3
};

const monthsMap: Record<InterestMonths  , number> = {
  NA: 1,
  All: 2,
  Quarterly: 3
};

const repaymentMap: Record<PrincipalRepayment, number> = {
  Fortnightly:1,
  Monthly:2  ,
  Quarterly: 3,  
  OnMaturity: 4
};

const reverseFrequencyMap: Record<number, InterestFrequency> = {
  1: 'Upfront',
  2: 'Monthly',
  3: 'Quarterly'
};

const reverseMonthsMap: Record<number, InterestMonths> = {
  1: 'NA',
  2: 'All',
  3: 'Quarterly'
};

const reverseRepaymentMap: Record<number, PrincipalRepayment> = {
  1:  'Fortnightly',
  2:  'Monthly',
  3:  'Quarterly',
  4:  'OnMaturity'
};


@Component({
  selector: 'app-company',
  standalone: true, // ✅ required for routing to work
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  imports: [CommonModule, ReactiveFormsModule,FormsModule]
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  companyForm!: FormGroup;
  isEditing: boolean = false;
  
  
  interestFrequencies = ['Upfront', 'Monthly', 'Quarterly'];
  interestMonthsOptions = ['NA', 'All', 'Quarterly'];
  principalRepaymentOptions = ['Fortnightly','Monthly','Quarterly','OnMaturity'];

  filters = {
    CompanyCode: '',
    CompanyName: '',
    ContactNo1: '',
    ContactNo2:'',
    EmailId:'',
    BankName:'',
    BankAccountNo:'',
    BankIFSC:'',
  };  

  constructor( private fb: FormBuilder, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.initForm();
  }

  initForm() {
    this.companyForm = this.fb.group({
      CompanyCode: [''],
      CompanyName: [''],
      ContactNo1: [''],
      ContactNo2: [''],
      EmailId: [''],
      BankName: [''],
      BankAccountNo: [''],
      BankIFSC: [''],
      DateOfInvestment: [''],
      TenureMonths: [''],
      MaturityDate: [''],
      InterestRate: [''],
      InterestFrequency: [''],
      InterestMonths: [''],
      PaymentDay: [''],
      PrincipalRepayment: ['']
    });
  }  

  loadCompanies() {
    this.companyService.getAll().subscribe(data => {
      this.companies = data;
    });
  }


  saveCompany() {
    console.log("save scheme");

  //const company: Company = this.companyForm.value;

  const f = (name: string) => this.companyForm.get(name)?.value;//helper to remove repetative code

  const company: Company =
  {
    CompanyCode:f('CompanyCode'),// this.companyForm.get('CompanyCode')?.value,
    CompanyName: f('CompanyName'),//this.companyForm.get('CompanyName')?.value,
    ContactNo1: f('ContactNo1'),//this.companyForm.get('ContactNo1')?.value,
    ContactNo2: f('ContactNo2'),//this.companyForm.get('ContactNo2')?.value,
    EmailId: f('EmailId'),//this.companyForm.get('EmailId')?.value,
    BankName: f('BankName'),//this.companyForm.get('BankName')?.value,
    BankAccountNo: f('BankAccountNo'),//this.companyForm.get('BankAccountNo')?.value,
    BankIFSC: f('BankIFSC'),//this.companyForm.get('BankIFSC')?.value,
    DateOfInvestment: f('DateOfInvestment'),//this.companyForm.get('DateOfInvestment')?.value,
    TenureMonths:f('TenureMonths'),// this.companyForm.get('TenureMonths')?.value,
    MaturityDate:f('MaturityDate'),// this.companyForm.get('MaturityDate')?.value,
    InterestRate: f('InterestRate'),//this.companyForm.get('InterestRate')?.value,    
    InterestFrequency: frequencyMap[f('InterestFrequency') as InterestFrequency],
    InterestMonths: monthsMap[f('InterestMonths') as  InterestMonths],
    PaymentDay: f('PaymentDay'),//this.companyForm.get('PaymentDay')?.value,
    PrincipalRepayment: repaymentMap[f('PrincipalRepayment') as  PrincipalRepayment]

  }
  if (this.isEditing) {
    this.companyService.update(company).subscribe(() => {
      this.loadCompanies();
      this.cancelEdit();
    });
  } else {
    this.companyService.create(company).subscribe(() => {
      this.loadCompanies();
      this.companyForm.reset();
    });
  }
}

editCompany(company: Company) {

  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr);
    return date.toISOString().substring(0, 10); // 'yyyy-MM-dd'
  };

  this.companyForm.patchValue({
    CompanyCode: company.CompanyCode,
    CompanyName: company.CompanyName,
    ContactNo1: company.ContactNo1,
    ContactNo2: company.ContactNo2,
    EmailId: company.EmailId,
    BankName: company.BankName,
    BankAccountNo: company.BankAccountNo,
    BankIFSC: company.BankIFSC,
    DateOfInvestment: company.DateOfInvestment ? formatDate(company.DateOfInvestment) : '',
    TenureMonths: company.TenureMonths,
    MaturityDate: company.MaturityDate ? formatDate(company.MaturityDate) : '',
    InterestRate: company.InterestRate,

    // ✅ Enum-safe patching with fallback default values
    InterestFrequency: reverseFrequencyMap[company.InterestFrequency as number] ?? 'Monthly',
    InterestMonths: reverseMonthsMap[company.InterestMonths as number] ?? 'NA',
    PaymentDay: company.PaymentDay,
    PrincipalRepayment: reverseRepaymentMap[company.PrincipalRepayment as number] ?? 'OnMaturity'

  });
  this.isEditing = true;
}

deleteCompany(code: string) {
  this.companyService.delete(code).subscribe(() => {
    this.loadCompanies();
  });
}

cancelEdit() {
  this.companyForm.reset();
  this.isEditing = false;
}
 

filteredLinks() {
  return this.companies?.filter(link =>
    (!this.filters.CompanyCode || link.CompanyCode?.toLowerCase().includes(this.filters.CompanyCode.toLowerCase())) &&
    (!this.filters.CompanyName || link.CompanyName?.toLowerCase().includes(this.filters.CompanyName.toLowerCase())) &&
    (!this.filters.ContactNo1 || link.ContactNo1?.toString().includes(this.filters.ContactNo1.toLowerCase()))&&
    (!this.filters.EmailId || link.EmailId?.toLowerCase().includes(this.filters.EmailId.toLowerCase())) &&
    (!this.filters.BankName || link.BankName?.toLowerCase().includes(this.filters.BankName.toLowerCase())) &&
    (!this.filters.BankAccountNo || link.BankAccountNo?.toString().includes(this.filters.BankAccountNo.toLowerCase()))&&
    (!this.filters.BankIFSC || link.BankIFSC?.toString().includes(this.filters.BankIFSC.toLowerCase()))
  );
}

}
