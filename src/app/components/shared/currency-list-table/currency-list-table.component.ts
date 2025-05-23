import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-currency-list-table',
  imports: [CommonModule, MatTableModule, DecimalPipe],
  templateUrl: './currency-list-table.component.html',
  styleUrl: './currency-list-table.component.scss',
})
export class CurrencyListTableComponent {
  readonly currencyExchangData = input<any[]>([]);
  readonly selectedCurrencies = input<string[]>([]);

  get displayedColumns(): string[] {
    return ['date', ...this.selectedCurrencies()];
  }
}
