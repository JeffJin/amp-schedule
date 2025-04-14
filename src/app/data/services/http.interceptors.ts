import { inject, Injectable } from '@angular/core';
import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent, HttpEventType,
  HttpHandler, HttpHandlerFn,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthApiActions } from '../../store/actions/auth.actions';
import { StorageService } from './storage.service';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export const CACHING_ENABLED = new HttpContextToken<boolean>(() => false);

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      // console.log(req.url, 'returned a response with status', event.status);
    }
  }));
}

export function cachingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.context.get(CACHING_ENABLED)) {
    // apply caching logic
    return EMPTY;
  } else {
    // caching has been disabled for this request
    return next(req);
  }
}

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const cacheSvc = inject(StorageService);
  const store = inject(Store);
  const router = inject(Router);

  const token = cacheSvc.getToken();
  const headers: any = {};

  // if(!request.url.includes('ag-grid.com')) {
  //   if (token) {
  //     headers.Authorization = `Bearer ${token}`;
  //   }
  // }

  // if(request.url.endsWith('amazonaws.com/graphql')) {
  //   headers['x-api-key'] = `${environment.awsApiKey}`;
  // }

  request = request.clone({
    setHeaders: headers
  });

  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err) {
        switch (err.status) {
          case 400:
            break;
          case 401:
            store.dispatch(AuthApiActions.logout());
            break;
          case 500:
            break;
          default:
            break;
        }
      }
      return throwError(() => err);
    }),
  );
}
