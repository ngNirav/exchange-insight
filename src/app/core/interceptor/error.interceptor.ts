import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const defaultErrorMessage = 'Unable to fetch the currency data';
      let errorMessage;
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage =
          error.error?.message || defaultErrorMessage || error.message;
      }

      // Show alert with error message
      snackbarService.openSnackBar(errorMessage);

      return throwError(() => error);
    })
  );
};
