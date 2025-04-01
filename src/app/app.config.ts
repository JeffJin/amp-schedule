import { APP_INITIALIZER, ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
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
    provideRouter(routes),
    provideAppInitializer(initializeApp())
  ],
};
