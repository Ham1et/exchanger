import { CurrencyOption } from '../../pages/home/components/exchanger/exchanger';

export interface History {
  id: number;
  from: CurrencyOption;
  to: CurrencyOption;
  amount: number;
  result: number;
  rate: number;
}
