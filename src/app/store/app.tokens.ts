import {InjectionToken} from '@angular/core';

// token for the state keys.
export const AUTH_SAVED_KEYS = new InjectionToken<string[]>('AuthStateKeys');
// token for the localStorage key.
export const AUTH_STORAGE_KEY = new InjectionToken<string>('appAuthStorage');
