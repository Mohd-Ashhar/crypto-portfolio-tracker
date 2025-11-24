import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Crypto, PortfolioItem } from '../models/crypto.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3';
  private portfolioSubject = new BehaviorSubject<PortfolioItem[]>([]);
  public portfolio$ = this.portfolioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPortfolioFromStorage();
  }

  // Get top cryptocurrencies
  getTopCryptos(limit: number = 50): Observable<Crypto[]> {
    return this.http.get<Crypto[]>(
      `${this.apiUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
    );
  }

  // Search cryptocurrencies
  searchCryptos(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?query=${query}`);
  }

  // Portfolio management
  addToPortfolio(crypto: Crypto, quantity: number, purchasePrice: number) {
    const currentPortfolio = this.portfolioSubject.value;
    const existingIndex = currentPortfolio.findIndex((item) => item.crypto.id === crypto.id);

    if (existingIndex >= 0) {
      // Update existing position
      currentPortfolio[existingIndex].quantity += quantity;
    } else {
      // Add new position
      currentPortfolio.push({ crypto, quantity, purchasePrice });
    }

    this.portfolioSubject.next(currentPortfolio);
    this.savePortfolioToStorage();
  }

  removeFromPortfolio(cryptoId: string) {
    const currentPortfolio = this.portfolioSubject.value.filter(
      (item) => item.crypto.id !== cryptoId
    );
    this.portfolioSubject.next(currentPortfolio);
    this.savePortfolioToStorage();
  }

  getPortfolio(): PortfolioItem[] {
    return this.portfolioSubject.value;
  }

  // LocalStorage persistence
  private savePortfolioToStorage() {
    localStorage.setItem('crypto-portfolio', JSON.stringify(this.portfolioSubject.value));
  }

  private loadPortfolioFromStorage() {
    const saved = localStorage.getItem('crypto-portfolio');
    if (saved) {
      this.portfolioSubject.next(JSON.parse(saved));
    }
  }

  // Calculate portfolio metrics
  getPortfolioValue(): number {
    return this.portfolioSubject.value.reduce((total, item) => {
      return total + item.crypto.current_price * item.quantity;
    }, 0);
  }

  getPortfolioProfitLoss(): number {
    return this.portfolioSubject.value.reduce((total, item) => {
      const currentValue = item.crypto.current_price * item.quantity;
      const investedValue = item.purchasePrice * item.quantity;
      return total + (currentValue - investedValue);
    }, 0);
  }
}
