import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatePickerComponent } from '../shared/date-picker/date-picker.component';
import { CurrencyListTableComponent } from '../shared/currency-list-table/currency-list-table.component';
import { BaseCurrencySelectorComponent } from '../shared/base-currency-selector/base-currency-selector.component';
import { CurrencyExchangeRateService } from '../../services/currency-exchange-rate.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ICurrentExchangeRateRaw } from '../../models/currency.model';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbarModule,
    DatePickerComponent,
    CurrencyListTableComponent,
    BaseCurrencySelectorComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private readonly currencyExchangeRateService = inject(
    CurrencyExchangeRateService
  );
  availableCurrencies: WritableSignal<Record<string, string>> = signal({});
  selectedCurrencies: WritableSignal<Array<string>> = signal([
    'usd',
    'eur',
    'jpy',
    'chf',
    'cad',
    'aud',
    'zar',
  ]);
  baseCurrency: WritableSignal<string> = signal('gbp');
  selectedDate = signal(new Date());
  exchangeData: WritableSignal<ICurrentExchangeRateRaw[]> = signal([]);

  ngOnInit(): void {
    this.getAllAvailableCurrencies();
  }

  private getAllAvailableCurrencies(): void {
    this.currencyExchangeRateService.getAllAvailableCurrencies().subscribe({
      next: (response) => {
        this.availableCurrencies.set(response);
        this.loadHistoryExchangeData();
      }
    });
  }

  private loadHistoryExchangeData(): void {
    this.currencyExchangeRateService
      .getCurrencyRatesForLastSevenDays(
        this.baseCurrency(),
        this.selectedDate()
      )
      .subscribe({
        next: (response) => {
          this.exchangeData.set(response);
        }
      });
  }

  public onBaseCurrencyChange(base: string): void {
    this.baseCurrency.set(base);
    this.loadHistoryExchangeData();
  }

  public onSelectedCurrenciesChange(currencies: string[]): void {
    this.selectedCurrencies.set(currencies);
    this.loadHistoryExchangeData();
  }

  public onDateChange(): void {
    this.loadHistoryExchangeData();
  }
}
