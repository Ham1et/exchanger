import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Convert } from '../common/interfaces/convert.interface';
import { ResponseI } from '../common/interfaces/response.interface';
import { Currency } from '../common/interfaces/currency.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyBeacon {
  private baseUrl = 'https://api.currencybeacon.com/v1';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<ResponseI<Currency[]>> {
    return this.http.get<ResponseI<Currency[]>>(`${this.baseUrl}/currencies`, {
      params: { api_key: environment.apiKey },
    });
  }

  convert(from: string, to: string, amount: number): Observable<ResponseI<Convert>> {
    return this.http.get<ResponseI<Convert>>(`${this.baseUrl}/convert`, {
      params: {
        from,
        to,
        amount,
        api_key: environment.apiKey,
      },
    });
  }
}
