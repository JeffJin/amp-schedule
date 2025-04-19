import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideAppInitializer,
  provideZoneChangeDetection,
  isDevMode
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import {
  authInterceptor,
  cachingInterceptor,
  loggingInterceptor
} from './data/services/http.interceptors';
import { AUTH_SAVED_KEYS, AUTH_STORAGE_KEY } from './store/app.tokens';
import { AuthEffects } from './store/effects/auth.effects';
import { ImageEffects } from './store/effects/image.effects';
import { VideoEffects } from './store/effects/video.effects';
import { authMetaReducer } from './store/reducers/meta.reducers';
import { authReducer, authKey } from './store/reducers/auth.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import outputs from '../../amplify_outputs.json';
import { Amplify } from 'aws-amplify';

function initializeApp() {
  return () => {
    Amplify.configure(outputs);
    return Promise.resolve();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: AUTH_SAVED_KEYS,
      useValue: ['user']
    },
    {
      provide: AUTH_STORAGE_KEY,
      useValue: 'auth.storage',
    },
    provideAppInitializer(initializeApp()),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor,
        loggingInterceptor,
        cachingInterceptor
      ]),
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authKey, authReducer, { metaReducers: [authMetaReducer] }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([
      AuthEffects,
      VideoEffects,
      ImageEffects,
    ])
  ]
};

