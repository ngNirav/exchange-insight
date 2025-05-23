import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCurrencySelectorComponent } from './base-currency-selector.component';

describe('BaseCurrencySelectorComponent', () => {
  let component: BaseCurrencySelectorComponent;
  let fixture: ComponentFixture<BaseCurrencySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCurrencySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCurrencySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
