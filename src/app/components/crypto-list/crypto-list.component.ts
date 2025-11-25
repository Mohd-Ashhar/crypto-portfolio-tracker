import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoCardComponent } from '../crypto-card/crypto-card.component';
import { CryptoService } from '../../services/crypto.service';
import { Crypto } from '../../models/crypto.model';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CryptoCardComponent],
})
export class CryptoListComponent implements OnInit {
  cryptos: Crypto[] = [];
  filteredCryptos: Crypto[] = [];
  loading: boolean = true;
  searchTerm: string = '';

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.loadCryptos();
  }

  loadCryptos() {
    this.loading = true;
    this.cryptoService.getTopCryptos(50).subscribe({
      next: (data) => {
        this.cryptos = data;
        this.filteredCryptos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cryptos:', error);
        this.loading = false;
      },
    });
  }

  onSearch() {
    this.filteredCryptos = this.cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  refresh() {
    this.loadCryptos();
  }
}
