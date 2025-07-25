import { HttpInterceptorFn } from '@angular/common/http';
import { CurrencyBeacon } from '../../api/currency-beacon';
import { environment } from '../../../environments/environment';

export const authBeaconInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(CurrencyBeacon.baseUrl)) {
    return next(req.clone({ setHeaders: { Authorization: `Bearer ${environment.apiKey}` } }));
  }

  return next(req);
};
