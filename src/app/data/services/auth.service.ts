import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_STORAGE_KEY } from '../../store/app.tokens';
import { StorageService } from './storage.service';
import { getCurrentUser, signIn, SignInOutput } from 'aws-amplify/auth';
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

  async login(email: string, password: string): Promise<SignInOutput> {
    console.log('AuthService.login', email, password);
    const signInResult = await signIn({
      username: email,
      password,
    });
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log('AuthService.login', signInResult);
    if (signInResult.isSignedIn) {
      setTimeout(() => {
        this.store.dispatch(AuthApiActions.loginSuccessRedirect({
          user: {
            id: userId,
            userName: username,
            email: signInDetails?.loginId,
            authType: signInDetails?.authFlowType,
            phoneNumber: ''
          }
        }));
      }, 500);
      return Promise.resolve(signInResult);
    } else {
      this.store.dispatch(AuthApiActions.logoutFailureRedirect());
      return Promise.reject(signInResult);
    }
  }
}
