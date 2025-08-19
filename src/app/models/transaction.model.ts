export interface Transaction {
    TransactionCode:string;             
    TransactionDate: string;
    CompanyCode: string;
    ClientCode: string;
    SchemeCode: string;
    Amount: number;
    CreditDebit: 'Credit' | 'Debit';
    TransactionType:string;
    IsReturnComplete: number;
    Remarks:string;
  }
  