export interface Company {
  CompanyCode: string;
  CompanyName: string;
  ContactNo1: string;
  ContactNo2: string;
  EmailId: string;
  BankName: string;
  BankAccountNo: string;
  BankIFSC: string;
  DateOfInvestment: string;       // ISO date format string (e.g., '2025-08-01')
  TenureMonths: number;
  MaturityDate: string;           // ISO date format string (e.g., '2026-08-01')
  InterestRate: number;
  InterestFrequency: number;      // e.g., 'Upfront', 'Monthly', 'Quarterly'
  InterestMonths: number;         // e.g., 'NA', 'All', 'Quarterly'
  PaymentDay: number;             // Numeric day (e.g., 1–30)
  PrincipalRepayment: number;     // e.g., 'On Maturity', 'Quarterly', 'Fortnightly'
}
