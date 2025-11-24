import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { CryptoCardComponent } from './components/crypto-card/crypto-card.component';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoListComponent,
    CryptoCardComponent,
    PortfolioSummaryComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, CommonModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
