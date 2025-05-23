import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with current date', () => {
    const today = new Date();
    const selectedDate = component.selectedDate();
    expect(selectedDate.getDate()).toBe(today.getDate());
    expect(selectedDate.getMonth()).toBe(today.getMonth());
    expect(selectedDate.getFullYear()).toBe(today.getFullYear());
  });

  it('should set max date to current date', () => {
    const today = new Date();
    const maxDate = component.maxDate();
    expect(maxDate.getDate()).toBe(today.getDate());
    expect(maxDate.getMonth()).toBe(today.getMonth());
    expect(maxDate.getFullYear()).toBe(today.getFullYear());
  });

  it('should set min date to 90 days before current date', () => {
    const today = new Date();
    const ninetyDaysAgo = new Date(today.setDate(today.getDate() - 90));
    const minDate = component.minDate();
    expect(minDate.getDate()).toBe(ninetyDaysAgo.getDate());
    expect(minDate.getMonth()).toBe(ninetyDaysAgo.getMonth());
    expect(minDate.getFullYear()).toBe(ninetyDaysAgo.getFullYear());
  });

  it('should emit date change event when date is changed', () => {
    const dateChangeSpy = spyOn(component.dateChange, 'emit');
    const newDate = new Date();
    const mockEvent = {
      value: newDate,
      target: {} as any,
      targetElement: {} as any,
    };

    component.onDateChange(
      mockEvent as unknown as MatDatepickerInputEvent<Date>
    );
    expect(dateChangeSpy).toHaveBeenCalled();
    expect(component.selectedDate()).toEqual(newDate);
  });
});
