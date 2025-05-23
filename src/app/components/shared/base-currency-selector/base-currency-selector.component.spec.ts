import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseCurrencySelectorComponent } from './base-currency-selector.component';
import { SnackbarService } from '../../../services/snackbar.service';

describe('BaseCurrencySelectorComponent', () => {
  let component: BaseCurrencySelectorComponent;
  let fixture: ComponentFixture<BaseCurrencySelectorComponent>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    snackbarService = jasmine.createSpyObj('SnackbarService', ['openSnackBar']);
    await TestBed.configureTestingModule({
      imports: [BaseCurrencySelectorComponent],
      providers: [{ provide: SnackbarService, useValue: snackbarService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseCurrencySelectorComponent);
    component = fixture.componentInstance;
    component.selectedCurrencies = ['usd', 'eur', 'gbp'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectionChange when adding a new currency', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedCurrencies = ['usd', 'eur'];
    component.addCurrency('gbp');
    expect(component.selectionChange.emit).toHaveBeenCalledWith(['usd', 'eur', 'gbp']);
  });

  it('should not emit selectionChange if currency already selected', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedCurrencies = ['usd', 'eur'];
    component.addCurrency('usd');
    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  });

  it('should not emit selectionChange if selectedCurrencies length is 7 or more', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedCurrencies = ['usd', 'eur', 'gbp', 'jpy', 'aud', 'cad', 'chf'];
    component.addCurrency('sek');
    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  });

  it('should emit selectionChange when removing a currency if more than 3 remain', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedCurrencies = ['usd', 'eur', 'gbp', 'jpy'];
    component.removeCurrency('usd');
    expect(component.selectionChange.emit).toHaveBeenCalledWith(['eur', 'gbp', 'jpy']);
  });

  it('should not emit selectionChange when removing a currency if 3 or fewer remain', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedCurrencies = ['usd', 'eur', 'gbp'];
    component.removeCurrency('usd');
    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  });

  it('should call snackbarService.openSnackBar when promptUser is called and 7 currencies are selected', () => {
    component.selectedCurrencies = ['usd', 'eur', 'gbp', 'jpy', 'aud', 'cad', 'chf'];
    component.promptUser();
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith('You can only select 7 currencies');
  });

  it('should not call snackbarService.openSnackBar when promptUser is called and less than 7 currencies are selected', () => {
    component.selectedCurrencies = ['usd', 'eur', 'gbp'];
    component.promptUser();
    expect(snackbarService.openSnackBar).not.toHaveBeenCalled();
  });
});
