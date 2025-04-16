import { Inject, Injectable } from '@angular/core';
import { AUTH_STORAGE_KEY } from '../../store/app.tokens';
import { IUser } from '../models/dtos';

@Injectable({
    providedIn: 'root'
  }
)
export class StorageService {

  constructor(@Inject(AUTH_STORAGE_KEY) private authStorageKey: string) {
  }

  get(key: string): any {
    if (!localStorage) {
      return null;
    }
    return localStorage.getItem(key);
  }

  set(key: string, value: any) {
    if (localStorage) {
      localStorage.setItem(key, value);
    }
  }

  remove(key: string) {
    if (localStorage) {
      localStorage.removeItem(key);
    }
  }

  getToken(): string {
    if (!localStorage) {
      return '';
    }
    const user = this.getUser();
    if (user && user.token) {
      return user.token;
    }
    return '';
  }

  setSavedState(state: any, localStorageKey: string) {
    if (!localStorage) {
      return;
    }
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }

  getSavedState(localStorageKey: string): any {
    if (!localStorage) {
      return null;
    }
    try {
      const raw = localStorage.getItem(localStorageKey);
      if (raw != null) {
        return JSON.parse(raw);
      }
    } catch (err) {
      return null;
    }
    return null;
  }


  getUser(): any {
    if (!localStorage) {
      return null;
    }
    try {
      const item = localStorage.getItem(this.authStorageKey) || '';
      const result = JSON.parse(item);
      return result?.user;
    } catch (err) {
      return null;
    }
  }

  setUser(user: any): void {
    if (!localStorage) {
      return;
    }
    const dto: IUser = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
    const item = JSON.stringify(dto);
    localStorage.setItem('user', item);
  }

  setXsrfToken(token: any): void {
    if (!localStorage) {
      return;
    }
    localStorage.setItem('xsrf', token);
  }

  getXsrfToken(): any {
    if (!localStorage) {
      return null;
    }
    return localStorage.getItem('xsrf');
  }
}
