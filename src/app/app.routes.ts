import { Routes } from '@angular/router';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary.component';

export const routes: Routes = [
  { path: '', component: CryptoListComponent },
  { path: 'portfolio', component: PortfolioSummaryComponent },
  { path: '**', redirectTo: '' }
];
