import { TestBed } from '@angular/core/testing';

import { CurrencyBeacon } from './currency-beacon';

describe('CurrencyBeacon', () => {
  let service: CurrencyBeacon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyBeacon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
