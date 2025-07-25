import { ChangeDetectionStrategy, Component, computed, effect, signal, untracked } from '@angular/core';
import { Store } from '../../../../services/store';
import { CurrencyBeacon } from '../../../../api/currency-beacon';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { debounceTime, finalize, skip } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

export interface CurrencyOption {
  fullName: string;
  name: string;
  short_code: string;
  symbol: string;
}

const DEFAULT_FROM: CurrencyOption = {
  fullName: 'GBP Pound Sterling',
  name: 'Pound Sterling',
  short_code: 'GBP',
  symbol: '£',
};

const DEFAULT_TO: CurrencyOption = {
  fullName: 'USD US Dollar',
  name: 'US Dollar',
  short_code: 'USD',
  symbol: '$',
};

@Component({
  standalone: true,
  selector: 'app-exchanger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Select, InputNumber, FormsModule, Button, FloatLabel, CurrencyPipe],
  templateUrl: './exchanger.html',
  styleUrl: './exchanger.scss',
})
export class Exchanger {
  readonly from = signal<CurrencyOption>(DEFAULT_FROM);
  readonly to = signal<CurrencyOption>(DEFAULT_TO);
  readonly amount = signal(1);
  readonly rate = signal(0);
  readonly isLoading = signal(false);

  readonly options = computed(() =>
    this.store.currencies().map(({ name, short_code, symbol }) => {
      return {
        fullName: `${short_code} ${name}`,
        name,
        short_code,
        symbol,
      };
    })
  );

  readonly result = computed(() => +(this.amount() * this.rate()).toFixed(10));

  constructor(
    public store: Store,
    private currencyBeacon: CurrencyBeacon
  ) {
    effect(() => {
      if (this.from().short_code && this.to().short_code) {
        untracked(() => {
          this.convert();
        });
      }
    });

    toObservable(this.result)
      .pipe(debounceTime(500), skip(1))
      .subscribe(() => {
        const exchange = {
          id: Date.now(),
          from: this.from(),
          to: this.to(),
          amount: this.amount(),
          result: this.result(),
          rate: this.rate(),
        };
        if (this.amount() > 0) {
          this.store.setHistory(exchange);
        }
      });

    effect(() => {
      const data = this.store.backExchange();
      if (data) {
        this.from.set(data.from);
        this.to.set(data.to);
        this.amount.set(data.amount);
      }
    });
  }

  convert() {
    this.isLoading.set(true);
    const amount = this.amount() > 0 ? this.amount() : 1;
    this.currencyBeacon
      .convert(this.from().short_code, this.to().short_code, amount)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: data => {
          const result = +data.response.value.toFixed(10);
          this.rate.set(+(result / amount).toFixed(10));
        },
        error: err => {
          console.error('Error converting currency:', err);
        },
      });
  }

  swapCurrencies() {
    const temp = this.from();
    this.from.set(this.to());
    this.to.set(temp);
  }
}
