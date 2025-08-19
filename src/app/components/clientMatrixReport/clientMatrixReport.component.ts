
// report.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ReportService } from '../../services/clientInvestmentMatrix.service';

@Component({
  selector: 'app-report',
  templateUrl: './clientMatrixReport.component.html',
  imports: [CommonModule, ReactiveFormsModule,FormsModule]
})
export class ClientMatrixReport implements OnInit {
  reportData: any[] = [];
  columns: string[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    const clientCode = '12345'; // You can make this dynamic
    this.reportService.getReport(clientCode).subscribe(data => {
      this.reportData = data;
      this.columns = data.length ? Object.keys(data[0]) : [];
    });
  }
}