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

  async login(email: string, password: string): Promise<SignInOutput> {
    console.log('AuthService.login', email, password);
    const signInResult = await signIn({
      username: email,
      password,
    });
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log('AuthService.login', signInResult);
    if (signInResult.isSignedIn) {
      this.store.dispatch(AuthApiActions.loginSuccessRedirect({
        user: {
          id: userId,
          userName: username,
          email: signInDetails?.loginId,
          authType: signInDetails?.authFlowType,
          phoneNumber: ''
        }
      }));
      return Promise.resolve(signInResult);
    } else {
      this.store.dispatch(AuthApiActions.logoutFailureRedirect());
      return Promise.reject(signInResult);
    }
  }
}
