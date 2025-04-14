import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const authenticator = inject(AuthenticatorService);
  const router = inject(Router);
  const isLoggedIn = authenticator.authStatus === 'authenticated';
  if (isLoggedIn) {
    return true;
  } else {
    await router.navigate(['/login']);
    return false;
  }
};
