import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, HostListener, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../store/actions/auth.actions';
import { DashboardActions } from '../../store/actions/dashboard-actions';
import { selectUser } from '../../store/app.selectors';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-dashboard-toolbar',
  imports: [
  ],
  animations: [
    trigger('openCloseProfile', [
      state('*', style({ opacity: 0 })),
      state(
        'open-profile',
        style({
          opacity: 1,
          transform: 'scale(1, 1)'
        }),
      ),
      state(
        'closed-profile',
        style({
          opacity: 0,
          transform: 'scale(0.95, 0.95)'
        }),
      ),
      transition(':leave', [ animate('100ms ease-in') ]),
      transition('open-profile => closed-profile', [ animate('100ms ease-in') ]),
      transition('closed-profile => open-profile', [ animate('75ms ease-out') ]),
    ])
  ],
  templateUrl: './dashboard-toolbar.component.html',
  styleUrl: './dashboard-toolbar.component.scss'
})
export class DashboardToolbarComponent {
  private isNotificationOpen: boolean = false;
  protected isProfileMenuOpen: boolean = false;

  protected user;

  constructor(private store: Store, private authenticator: AuthenticatorService) {
    this.user = this.store.selectSignal(selectUser);

  }

  get openCloseProfileMenu(): string {
    // console.log('getter,  openCloseProfileMenu', this.isProfileMenuOpen);
    return this.isProfileMenuOpen ? 'open-profile' : 'closed-profile';
  }

  toggleProfileMenu($event: MouseEvent) {
    $event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  toggleNotifications($event: MouseEvent) {
    $event.stopPropagation();
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  @HostListener('document:click', [ '$event.target' ])
  onClick(element: HTMLElement) {
    this.isProfileMenuOpen = false;
    this.isNotificationOpen = false;
  }

  logout() {
    this.authenticator.signOut();
    this.store.dispatch(AuthApiActions.logoutSuccessRedirect());
  }

  showSideMenu() {
    console.log('dashboard toolbar toggleSidebarMenu');
    this.store.dispatch(DashboardActions.showDashboardSideMenu({ show: true }));
  }
}
