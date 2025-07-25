import { getTestBed, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { NgZone } from '@angular/core';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      { provide: NgZone, useValue: { run: (fn: any) => fn(), runOutsideAngular: (fn: any) => fn() } }
    ]
  });
});
