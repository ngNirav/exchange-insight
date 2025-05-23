import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  model,
  Output,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';

@Component({
  selector: 'app-date-picker',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, MatInputModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  @Output() dateChange = new EventEmitter();

  readonly maxDate = signal(new Date());
  readonly minDate = signal(
    new Date(new Date().setDate(this.maxDate().getDate() - 90))
  );
  public selectedDate = model(new Date()); // Initialize with the current date

  public onDateChange(event: any): void {
    this.selectedDate.set(event.value);
    this.dateChange.emit();
  }
}
