import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setError } from '../../store/error/error.action';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _store:Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = error.error.description;
          //errorMessage = `Código: ${error.status}, mensaje: ${error.message}`;
          this._store.dispatch(setError({ errorMessage }));
        }
        console.error(error.error);
        console.error(error.error.description);
        return throwError(()=>errorMessage);
      })
    );
  }
}
