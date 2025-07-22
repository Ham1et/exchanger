import { Injectable, signal } from '@angular/core';
import { Currency } from '../common/interfaces/currency.interface';
import { CurrencyBeacon } from '../api/currency-beacon';

@Injectable({
  providedIn: 'root',
})
export class Store {
  readonly isGlobalLoading = signal(false);
  readonly currencies = signal<Currency[]>([]);

  constructor(private currencyBeacon: CurrencyBeacon) {
    this.initCurrencies();
  }

  initCurrencies(): void {
    try {
      const storedCurrencies = JSON.parse(localStorage.getItem('currencies') || '');
      if (storedCurrencies) {
        this.currencies.set(storedCurrencies);
        return;
      }
    } catch (_) {}
    this.isGlobalLoading.set(true);
    this.currencyBeacon.getCurrencies().subscribe({
      next: data => {
        this.currencies.set(data.response);
        localStorage.setItem('currencies', JSON.stringify(data.response));
        this.isGlobalLoading.set(false);
      },
      error: err => {
        console.error('Error fetching currencies:', err);
      },
    });
  }
}
