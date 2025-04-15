import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
// import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
// import { AuthApiActions } from '../../store/actions/auth.actions';
// import { selectIsLoggedIn } from '../../store/app.selectors';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = signal(true);
  isOpen = signal<boolean>(false);
  private navigationEnd$;
  private unsubscribeNavigationEnd: Subscription | null = null;

  constructor(private authenticator: AuthenticatorService, private router: Router, private store: Store) {
    this.navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => (this.isOpen.set(false)))
    );
    // this.isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  }

  ngOnInit() {
    this. unsubscribeNavigationEnd = this.navigationEnd$.subscribe();
    // this.isLoggedIn.set(this.authenticator.authStatus === 'authenticated');
  }

  ngOnDestroy() {
    if(this.unsubscribeNavigationEnd) {
      this.unsubscribeNavigationEnd.unsubscribe();
    }
  }

  logout() {
    this.authenticator.signOut();
    this.store.dispatch(AuthApiActions.logoutSuccess());
  }
}
