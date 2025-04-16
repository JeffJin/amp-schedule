import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, tap } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../data/services/auth.service';
import { StorageService } from '../../data/services/storage.service';
import { AuthApiActions } from '../actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  loginSuccessRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginSuccessRedirect),
      map(action => {
          console.log('authEffect::AuthApiActions.loginSuccessRedirect$');
          return AuthApiActions.loginSuccess({ user: action.user });
        }
      ),
      tap(() => this.router.navigate(['/dashboard']))
    )
  );

  logoutRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.logoutSuccessRedirect, AuthApiActions.logoutFailureRedirect),
      map(action => {
          console.log('authEffect::AuthApiActions.logoutRedirect$', action);
          return AuthApiActions.logoutSuccess();
        }
      ),
      tap(() => this.router.navigate(['/login']))
    )
  );
}
