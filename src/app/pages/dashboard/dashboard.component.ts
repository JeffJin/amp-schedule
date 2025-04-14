import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DashboardToolbarComponent } from '../../components/dashboard-toolbar/dashboard-toolbar.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { selectIsLoggedIn } from '../../store/app.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [
    SideNavComponent,
    RouterOutlet,
    DashboardToolbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  isLoggedIn$: Observable<boolean>;
  private readonly unsubLoggedIn: Subscription;

  constructor(private router: Router,
              private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.unsubLoggedIn = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if(!isLoggedIn){
        return this.router.navigate(['/login']);
      }
      return Promise.resolve(true);
    })
  }

  ngOnDestroy() {
    if(this.unsubLoggedIn){
      this.unsubLoggedIn.unsubscribe();
    }
  }
}
