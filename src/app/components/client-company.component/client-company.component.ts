import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { ClientService } from '../../services/client.service';
import { ClientCompanyService } from '../../services/client-company.service';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse'; // ✅ Correct default import
import { CommonModule } from '@angular/common';


const reverseFrequencyMap: Record<number, string> = {
  1: 'Upfront',
  2: 'Monthly',
  3: 'Quarterly'
};

const reverseMonthsMap: Record<number, string> = {
  1: 'NA',
  2: 'All',
  3: 'Quarterly'
};

const reverseRepaymentMap: Record<number, string> = {
  1: 'On Maturity',
  2: 'Quarterly',
  3: 'Fortnightly'
};

@Component({
  selector: 'app-client-company',
  standalone: true,
  templateUrl: './client-company.component.html',
  styleUrls: ['./client-company.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // ⬅️ Add these
  
})
export class ClientCompanyComponent implements OnInit {
  linkForm!: FormGroup;
  companies: any[] = [];
  clients: any[] = [];
  schemeDetails: any = null;
  isExistingLink = false;

  clientCompanyLinks: any[] = [];  // holds grid data
  selectedLink: any = null;        // currently editing

  filters = {
    CompanyName: '',
    ClientName: '',
    InvestingAmount: ''
  };

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private clientService: ClientService,
    private clientCompanyService: ClientCompanyService
  ) {}

  ngOnInit(): void {
    this.linkForm = this.fb.group({
      CompanyCode: ['', Validators.required],
      ClientCode: ['', Validators.required],
      InvestmentAmount: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadCompanies();
    this.loadClients();
    this.loadLinks(); 
  }

  

  loadCompanies() {
    this.companyService.getAll().subscribe(data => {
      this.companies = data;
    });
  }

  loadClients() {
    this.clientService.getAll().subscribe(data => {
      this.clients = data;
    });
  }


onCompanyChange() {

  
  const code = this.linkForm.get('CompanyCode')?.value;
  if (code) {
    const company = this.companies.find(c => c.CompanyCode === code);
    if (company) {
      this.schemeDetails = {
        ...company,
        InterestFrequencyText:reverseFrequencyMap[company.InterestFrequency as number] ?? 'Monthly',// interestFrequencyLabels[company.InterestFrequency],
        InterestMonthsText: reverseMonthsMap[company.InterestMonths as number] ?? 'NA',//interestMonthsLabels[company.InterestMonths],
        PrincipalRepaymentText: reverseRepaymentMap[company.PrincipalRepayment as number] ?? 'On Maturity'
      };
    }
  }
}

  saveLink() {
    if (this.schemeDetails && new Date(this.schemeDetails.DateOfInvestment) <= new Date()) {
      alert('Cannot modify record after Date of Investment');
      return;
    }

    this.loadLinks();  // load grid data



    const payload = {
      ...this.linkForm.value
    };

    this.clientCompanyService.create(payload).subscribe(() => {
      alert('Link saved successfully');
      this.linkForm.reset();
      this.schemeDetails = null;
    });
  }
 

loadLinks() {
  this.clientCompanyService.getAll().subscribe(data => {
    this.clientCompanyLinks = data.map(link => {
      const company = this.companies.find(c => c.CompanyCode === link.CompanyCode);
      const client = this.clients.find(cl => cl.ClientCode === link.ClientCode);

      return {
        ...link,
        CompanyName: company?.CompanyName || link.CompanyCode,
        ClientName: client?.ClientName || link.ClientCode,
        InterestFrequencyText:reverseFrequencyMap[company.InterestFrequency as number] ?? 'Monthly',// interestFrequencyLabels[company.InterestFrequency],
      InterestMonthsText: reverseMonthsMap[company.InterestMonths as number] ?? 'NA',//interestMonthsLabels[company.InterestMonths],
      PrincipalRepaymentText: reverseRepaymentMap[company.PrincipalRepayment as number] ?? 'On Maturity'

      };
    });
  });
}

  editLink(link: any) {
    this.linkForm.patchValue({
      CompanyCode: link.CompanyCode,
      ClientCode: link.ClientCode,
      InvestmentAmount: link.InvestmentAmount
    });
    const company = this.companies.find(c => c.CompanyCode === link.CompanyCode);

    this.schemeDetails = {
      ...company,
      InterestFrequencyText:reverseFrequencyMap[company.InterestFrequency as number] ?? 'Monthly',// interestFrequencyLabels[company.InterestFrequency],
      InterestMonthsText: reverseMonthsMap[company.InterestMonths as number] ?? 'NA',//interestMonthsLabels[company.InterestMonths],
      PrincipalRepaymentText: reverseRepaymentMap[company.PrincipalRepayment as number] ?? 'On Maturity'
    };
    this.isExistingLink = true;
    this.selectedLink = link;
  }
  deleteLink(link: any) {
    if (confirm('Are you sure to delete?')) {
      this.clientCompanyService.delete(link.CompanyCode, link.ClientCode).subscribe(() => {
        alert('Link deleted');
        this.loadLinks();
      });
    }
  }

  clearForm() {
    this.linkForm.reset();
    this.schemeDetails = null;
    this.isExistingLink = false;
    this.selectedLink = null;
  }

  filteredLinks() {
    return this.clientCompanyLinks?.filter(link =>
      (!this.filters.CompanyName || link.CompanyName?.toLowerCase().includes(this.filters.CompanyName.toLowerCase())) &&
      (!this.filters.ClientName || link.ClientName?.toLowerCase().includes(this.filters.ClientName.toLowerCase())) &&
      (!this.filters.InvestingAmount || link.InvestingAmount?.toString().includes(this.filters.InvestingAmount))
    );
  }
}




