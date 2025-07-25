import { TestBed } from '@angular/core/testing';

import { CurrencyBeacon } from './currency-beacon';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CurrencyBeacon', () => {
  let service: CurrencyBeacon;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyBeacon],
    });

    service = TestBed.inject(CurrencyBeacon);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
