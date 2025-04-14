import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { Actions } from '@ngrx/effects';
import {
  Action,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { merge, pick } from 'lodash-es';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../data/services/storage.service';
import { AUTH_SAVED_KEYS, AUTH_STORAGE_KEY } from '../app.tokens';

function loggerMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  // a function with the exact same signature of a reducer
  return function (state: any, action: Action) {
    const result = reducer(state, action);
    if (action.type.includes('Login Form') || action.type.includes('Auth API')) {
      console.groupCollapsed(action.type);
      console.log('prev state', state);
      console.log('action', action);
      console.log('next state', result);
      console.groupEnd();
    }
    return result;
  };
}

export function authMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const stateKeys = inject(AUTH_SAVED_KEYS);
  const storageKey = inject(AUTH_STORAGE_KEY);
  const storageService = inject(StorageService);
  const platformId = inject(PLATFORM_ID);
  let onInit = true; // after load/refresh…
  // a function with the exact same signature of a reducer
  return function (state: any, action: Action) {
    const nextState = reducer(state, action);
    if(isPlatformBrowser(platformId)) {
      // init the application state.
      if (onInit) {
        onInit = false;
        const savedState = storageService.getSavedState(storageKey);
        console.log('authMetaReducer:: restore states from local storage', savedState);
        return merge(nextState, savedState);
      }
      // save the next state to the application storage.
      //pick 'user' property from next state
      const stateToSave = pick(nextState, stateKeys);
      // console.log('authMetaReducer:: save states into local storage', stateKeys, stateToSave);
      storageService.setSavedState(stateToSave, storageKey);
    }
    return nextState;
  };
}
