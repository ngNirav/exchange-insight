import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  model,
  Output,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { SnackbarService } from '../../../services/snackbar.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  private readonly _snackbarService = inject(SnackbarService);
  public get snackbarService() {
    return this._snackbarService;
  }
  @Output() dateChange = new EventEmitter();

  readonly maxDate = signal(new Date());
  readonly minDate = signal(
    new Date(new Date().setDate(this.maxDate().getDate() - 90))
  );
  public selectedDate = model(new Date()); // Initialize with the current date
  public dateControl = new FormControl(
    this.selectedDate(),
    Validators.required
  );

  public onDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value && this.dateControl.valid) {
      this.selectedDate.set(event.value);
      this.dateChange.emit();
    } else this._snackbarService.openSnackBar('Invalid Date');
  }
}
