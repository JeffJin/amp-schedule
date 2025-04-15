import { Inject, Injectable, InjectionToken } from '@angular/core';
import { from, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AUTH_STORAGE_KEY } from '../../store/app.tokens';
import { IUser } from '../models/dtos';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { mockData } from './mock-data';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { getCurrentUser, signIn, SignInInput, SignInOutput } from 'aws-amplify/auth';
import { AuthApiActions } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
  }
)
export class AuthService {
  constructor(private http: HttpClient,
              @Inject(AUTH_STORAGE_KEY) private authStorageKey: string,
              private store: Store,
              private cacheService: StorageService) {
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.http.get(
      `${environment.apiBaseUrl}/users/validate_email?email=${email}`,
      { observe: 'response' } //full response data
    ).pipe(map((response: any) => {
      return response['duplicatedEmail'] === true;
    }));
  }

  login(username: string, password: string): Promise<SignInOutput> {
    console.log('handleSignIn', username, password);
    return new Promise((resolve, reject) => {
      signIn({
        username,
        password,
      }).then(result => {
        this.store.dispatch(AuthApiActions.loginSuccess({ user: { userName: username, email: username, token: '', phoneNumber: '' }}));
        resolve(result);
      }).catch((error) => {
        this.store.dispatch(AuthApiActions.logoutFailure({ error }));
        reject(error);
      })
    })
  }

  register(email: string, password: string, confirmPassword: string): Observable<any> {
    if (password !== confirmPassword) {
      return new Observable(obs => {
        obs.next({ message: 'Passwords do not match', code: 'PasswordsNotMatch' });
        obs.complete();
      });
    }
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('confirmPassword', confirmPassword);
    formData.append('password', password);
    return this.http.post(environment.apiBaseUrl + '/account/register', formData);
  }

  initXsrfToken(): Observable<any> {
    const token = this.cacheService.getXsrfToken();
    if (token && token.tokenName) {
      return new Observable((obs) => {
        obs.next(token);
        obs.complete();
      });
    } else {
      return this.http.get(environment.apiBaseUrl + '/common/xsrf').pipe(tap({
        next: (data: any) => {
          // store the result into local storage
          this.cacheService.setXsrfToken(data);
        },
        error: (err) => {
          this.cacheService.setXsrfToken(null);
        }
      }));
    }
  }

  logout(): Observable<boolean> {
    // const promise = new Promise<boolean>((resolve, reject) => {
    //   this.authenticator.signOut();
    //   setTimeout(() => {
    //     this.router.navigate(['/login'])
    //       .then((result) => {
    //       resolve(result);
    //     }).catch((err) => {
    //       reject(err);
    //     });
    //   }, 1000);
    // })
    return from(Promise.resolve(true));
  }

  resendVerification(email: string) {
    return this.http.post(environment.apiBaseUrl + '/account/send_verification_email', { email });
  }

  loginObs(email: string, password: string) {
    const result = this.login(email, password);
    return from(result);
  }
}
