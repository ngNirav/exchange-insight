import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  WritableSignal,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-base-currency-selector',
  imports: [CommonModule, MatFormFieldModule, MatChipsModule, MatSelectModule],
  templateUrl: './base-currency-selector.component.html',
  styleUrl: './base-currency-selector.component.scss',
})
export class BaseCurrencySelectorComponent implements OnInit  {
  readonly availableCurrencies = input<any>({});
  @Input() selectedCurrencies: string[] = [];
  readonly baseCurrency = input<string>('');
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() baseChange = new EventEmitter<string>();
  selectedCurrency: WritableSignal<string> = signal('');

  private readonly snackbarService = inject(SnackbarService);

  ngOnInit(): void {
    this.selectedCurrency.set(this.selectedCurrencies[this.selectedCurrencies.length - 1]);
  }
  get currencyCodes(): string[] {
    return Object.keys(this.availableCurrencies());
  }

  public addCurrency(code: string): void {
    this.selectedCurrency.set(code);
    if (
      !this.selectedCurrencies.includes(code) &&
      this.selectedCurrencies.length < 7
    ) {
      this.selectionChange.emit([...this.selectedCurrencies, code]);
    }
  }

  public removeCurrency(code: string): void {
    const selectedCurrencies = this.selectedCurrencies.filter(
      (c) => c !== code
    );
    this.selectedCurrency.set(
      selectedCurrencies[selectedCurrencies.length - 1]
    );
    if (this.selectedCurrencies.length > 3) {
      this.selectionChange.emit(selectedCurrencies);
    }
  }

  public promptUser(): void {
    if (this.selectedCurrencies.length === 7) {
      this.snackbarService.openSnackBar('You can only select 7 currencies');
    }
  }
}
