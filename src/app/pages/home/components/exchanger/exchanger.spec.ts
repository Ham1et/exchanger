import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exchanger } from './exchanger';

describe('Exchanger', () => {
  let component: Exchanger;
  let fixture: ComponentFixture<Exchanger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exchanger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exchanger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
