import { Injectable, signal, WritableSignal } from '@angular/core';
import { Currency } from '../common/interfaces/currency.interface';
import { CurrencyBeacon } from '../api/currency-beacon';
import { History } from '../common/interfaces/history.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Store {
  readonly isGlobalLoading = signal(false);
  readonly currencies = signal<Currency[]>([]);
  readonly backExchange = signal<History | null>(null);
  private readonly _history = signal<History[]>([]);

  constructor(private currencyBeacon: CurrencyBeacon) {
    this.initCurrencies();
  }

  get history(): WritableSignal<History[]> {
    return this._history;
  }

  setHistory(newHistory: History) {
    this._history.update(prev => [newHistory, ...prev.slice(0, environment.historyLimit - 1)]);
  }

  historyBack(id: number) {
    const data = this._history().find(v => v.id === id);
    if (data) {
      this.backExchange.set(data);
    }
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
