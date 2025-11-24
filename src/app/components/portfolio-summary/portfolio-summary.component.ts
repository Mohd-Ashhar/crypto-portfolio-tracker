import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { PortfolioItem } from '../../models/crypto.model';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.css'],
})
export class PortfolioSummaryComponent implements OnInit {
  portfolio: PortfolioItem[] = [];
  totalValue: number = 0;
  profitLoss: number = 0;
  profitLossPercentage: number = 0;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.cryptoService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
      this.calculateMetrics();
    });
  }

  calculateMetrics() {
    this.totalValue = this.cryptoService.getPortfolioValue();
    this.profitLoss = this.cryptoService.getPortfolioProfitLoss();

    const investedValue = this.portfolio.reduce((total, item) => {
      return total + item.purchasePrice * item.quantity;
    }, 0);

    this.profitLossPercentage = investedValue > 0 ? (this.profitLoss / investedValue) * 100 : 0;
  }

  removeItem(cryptoId: string) {
    this.cryptoService.removeFromPortfolio(cryptoId);
  }
}
