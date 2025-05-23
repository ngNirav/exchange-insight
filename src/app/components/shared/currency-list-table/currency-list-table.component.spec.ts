import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyListTableComponent } from './currency-list-table.component';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

describe('CurrencyListTableComponent', () => {
  let component: CurrencyListTableComponent;
  let fixture: ComponentFixture<CurrencyListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyListTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct columns based on selectedCurrencies', () => {
    (component as any).selectedCurrencies = signal(['usd', 'eur']);
    fixture.detectChanges();

    expect(component.displayedColumns).toEqual(['date', 'usd', 'eur']);
    const headerCells = fixture.nativeElement.querySelectorAll('th');
    expect(headerCells[0].textContent.trim().toLowerCase()).toBe('date');
    expect(headerCells[1].textContent.trim().toLowerCase()).toBe('usd');
    expect(headerCells[2].textContent.trim().toLowerCase()).toBe('eur');
  });

  it('should render table rows based on currencyExchangData', () => {
    const data = [
      { date: '2024-06-01', rates: { usd: 1.1, eur: 0.9 } },
      { date: '2024-06-02', rates: { usd: 1.2, eur: 0.95 } },
    ];

    (component as any).selectedCurrencies = signal(['usd', 'eur']);
    (component as any).currencyExchangData = signal(data);

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(2);

    expect(rows[0].textContent).toContain('2024-06-01');
    expect(rows[0].textContent).toContain('1.1');
    expect(rows[0].textContent).toContain('0.9');

    expect(rows[1].textContent).toContain('2024-06-02');
    expect(rows[1].textContent).toContain('1.2');
    expect(rows[1].textContent).toContain('0.95');
  });

  it('should display N/A if rate is missing', () => {
    const data = [{ date: '2024-06-01', rates: { usd: 1.1 } }];

    (component as any).selectedCurrencies = signal(['usd', 'eur']);
    (component as any).currencyExchangData = signal(data);

    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('tr.mat-row');
    expect(row.textContent).toContain('1.1'); // USD is present
    expect(row.textContent).toContain('N/A'); // EUR is missing
  });
});
