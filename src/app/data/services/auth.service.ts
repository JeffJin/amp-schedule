import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AUTH_STORAGE_KEY } from '../../store/app.tokens';
import { IUser } from '../models/dtos';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { mockData } from './mock-data';

@Injectable({
    providedIn: 'root'
  }
)
export class AuthService {
  constructor(private http: HttpClient,
              @Inject(AUTH_STORAGE_KEY) private authStorageKey: string,
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

  login(email: string, password: string): Observable<IUser> {
    const dto = { email, password };
    return this.http.post<IUser>(
      `${environment.apiBaseUrl}/account/login`,
      dto,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
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

  getUser(): Observable<any> {
    return new Observable(observer => {
      if (environment.noBackend) {
        observer.next(mockData.user);
        observer.complete();
      } else {
        this.http.get(environment.apiBaseUrl + '/users/current')
          .pipe(tap({
            next: (data: any) => {
              this.cacheService.setUser(data);
              observer.next(data);
              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            }
          }));
      }


    });
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

  logout(): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/account/logout', null).pipe(tap({
      next: (data: any) => {
        // store the result into local storage
        this.cacheService.remove(this.authStorageKey);
        this.cacheService.setXsrfToken(null);
        return data;
      },
      error: (err) => {
        this.cacheService.remove(this.authStorageKey);
        this.cacheService.setXsrfToken(null);
        return err;
      }
    }));
  }

  resendVerification(email: string) {
    return this.http.post(environment.apiBaseUrl + '/account/send_verification_email', { email });
  }
}
