import { Routes } from '@angular/router';
import { SchemeComponent } from './components/scheme/scheme.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionImportComponent } from './components/import/transaction-import.component'
import { CompanyComponent } from './components/company/company.component';
import { ClientComponent } from './components/client/client.component';
import { ClientCompanyComponent } from './components/client-company.component/client-company.component';
import { ClientReturnPlanComponent } from './components/client-return-plan/client-return-plan.component';
import { ClientMatrixReport } from './components/clientMatrixReport/clientMatrixReport.component';

export const routes: Routes = [
  { path: 'scheme', component: SchemeComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'import', component: TransactionImportComponent },
  { path: 'companies', component: CompanyComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'clientcompanies', component: ClientCompanyComponent },
  { path: 'clientreturnplan', component: ClientReturnPlanComponent },
  { path: 'clientmatrixreport', component: ClientMatrixReport },
  { path: '', redirectTo: 'companies', pathMatch: 'full' }, // optional
];
