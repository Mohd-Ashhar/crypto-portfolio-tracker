import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Crypto } from '../../models/crypto.model';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      alert(`Added ${this.quantity} ${this.crypto.symbol.toUpperCase()} to portfolio!`);
      this.quantity = 0;
      this.showAddForm = false;
    }
  }
}
