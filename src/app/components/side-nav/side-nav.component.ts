import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, effect, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { DashboardActions } from '../../store/actions/dashboard-actions';
import {
  selectDashboardSideMenuHidden,
  selectUser
} from '../../store/app.selectors';

@Component({
  selector: 'app-side-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgStyle
  ],
  animations: [
    trigger('openCloseSidebar', [
      state('*', style({ opacity: 0 })),
      state(
        'open-sidebar',
        style({
          opacity: 1,
        }),
      ),
      state(
        'closed-sidebar',
        style({
          opacity: 0,
        }),
      ),
      transition(':leave', [ animate('300ms') ]),
      transition('open-sidebar => closed-sidebar', [ animate('300ms') ]),
      transition('closed-sidebar => open-sidebar', [ animate('300ms') ]),
    ]),
    trigger('openCloseSidebarSlider', [
      state(
        'open-sidebar-slider',
        style({
          transform: 'translateX(0)'
        }),
      ),
      state(
        'closed-sidebar-slider',
        style({
          transform: 'translateX(-100%)'
        }),
      ),
      transition(
        ':leave',
        [ animate('300ms ease-in-out') ]
      ),
      transition(
        'open-sidebar-slider => closed-sidebar-slider',
        [ animate('300ms ease-in-out') ]
      ),
      transition(
        'closed-sidebar-slider => open-sidebar-slider',
        [ animate('300ms ease-in-out') ]
      ),
    ])
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit, OnDestroy {
  protected isSidebarClosed;
  protected user;
  private navigationEnd$;
  private unsubscribeNavigationEnd: Subscription | null = null;

  constructor(private store: Store, private router: Router) {
    this.user = this.store.selectSignal(selectUser);
    this.isSidebarClosed = this.store.selectSignal(selectDashboardSideMenuHidden);
    this.navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => (this.store.dispatch(DashboardActions.showDashboardSideMenu({ show: false }))))
    );
  }


  ngOnInit() {
    this.unsubscribeNavigationEnd = this.navigationEnd$.subscribe();
  }

  ngOnDestroy() {
    if (this.unsubscribeNavigationEnd) {
      this.unsubscribeNavigationEnd.unsubscribe();
    }
  }

  get openCloseSidebarSliderMenu(): string {
    return this.isSidebarClosed() ? 'closed-sidebar-slider' : 'open-sidebar-slider';
  }

  get openCloseSidebarMenu(): string {
    return this.isSidebarClosed() ? 'closed-sidebar' : 'open-sidebar';
  }

  closeSideMenu() {
    console.log('side nav showDashboardSideMenu');
    this.store.dispatch(DashboardActions.showDashboardSideMenu({ show: false }));
  }

  onSidebarAnimationDone($event: any) {
    if ($event.toState === 'closed-sidebar') {
      console.log('onSidebarAnimationDone', 'closed-sidebar');
      this.store.dispatch(DashboardActions.showDashboardSideMenu({ show: false }));
    }
  }

  onSidebarAnimationStart($event: any) {
    if ($event.toState === 'open-sidebar') {
      console.log('onSidebarAnimationStart', 'open-sidebar');
      this.store.dispatch(DashboardActions.showDashboardSideMenu({ show: true }));
    }
  }
}
