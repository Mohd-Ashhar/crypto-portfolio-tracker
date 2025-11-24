import { Component, Input } from '@angular/core';
import { Crypto } from '../../models/crypto.model';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css'],
})
export class CryptoCardComponent {
  @Input() crypto!: Crypto;
  quantity: number = 0;
  showAddForm: boolean = false;

  constructor(private cryptoService: CryptoService) {}

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addToPortfolio() {
    if (this.quantity > 0) {
      this.cryptoService.addToPortfolio(this.crypto, this.quantity, this.crypto.current_price);
      this.quantity = 0;
      this.showAddForm = false;
      alert(`Added ${this.quantity} ${this.crypto.symbol.toUpperCase()} to portfolio!`);
    }
  }
}
