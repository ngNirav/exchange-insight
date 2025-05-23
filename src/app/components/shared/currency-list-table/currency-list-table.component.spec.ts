import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyListTableComponent } from './currency-list-table.component';

describe('CurrencyListTableComponent', () => {
  let component: CurrencyListTableComponent;
  let fixture: ComponentFixture<CurrencyListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
