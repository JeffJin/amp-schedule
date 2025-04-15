import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../data/services/auth.service';
import { StorageService } from '../../data/services/storage.service';
import { AuthApiActions } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private storageService: StorageService = inject(StorageService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.login),
      exhaustMap(action =>
        this.authService.loginObs(action.email, action.password).pipe(
          map(user => {
            //TODO
            return AuthApiActions.loginSuccess({ user: { userName: action.email, email: action.email, token: '', phoneNumber: '' } });
          }),
          catchError((error) => {
            console.error(error);
            return of(error);
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.logout),
      exhaustMap(action =>
        this.authService.logout().pipe(
          map((result) => {
            return result ? AuthApiActions.logoutSuccess() : AuthApiActions.logoutFailure({ error: null });
          }),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    )
  );
}
