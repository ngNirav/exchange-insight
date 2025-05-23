import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, tap } from 'rxjs';
import {
  IAvailableCurrencies,
  ICurrentExchangeRateRaw,
} from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeRateService {
  private readonly baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient);

  // user to add the new currncy to the list not as base currency
  public getAllAvailableCurrencies(): Observable<IAvailableCurrencies> {
    return this.http.get<IAvailableCurrencies>(
      `${this.baseUrl}latest/v1/currencies.json`
    );
  }


  public getCurrencyRatesForLastSevenDays(
    base: string,
    fromDate: Date
  ): Observable<ICurrentExchangeRateRaw[]> {
    const dateList = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(fromDate.getTime());
      date.setDate(date.getDate() - i);
      return this.dateFormater(date); // 2024-03-06..
    });
    const requests = dateList.map((date) =>
      this.http
        .get<ICurrentExchangeRateRaw>(
          `${this.baseUrl}${date}/v1/currencies/${base}.json`
        )
        .pipe(map((data) => ({ date, rates: data[base] })))
    );

    return forkJoin(requests);
  }

  private dateFormater(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
