import { Component, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
  RouterOutlet
} from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Hub } from 'aws-amplify/utils';
import { CONNECTION_STATE_CHANGE, ConnectionState } from 'aws-amplify/data';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    AmplifyAuthenticatorModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  showHeaderFooter = signal<boolean>(false);
  guardedRoute = false;
  private routeSubscription: Subscription | null = null;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store,
              private title: Title,
              private meta: Meta){
  }

  async ngOnInit(): Promise<void> {
    Hub.listen('api', (data: any) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState as ConnectionState;
        console.log('connectionState', connectionState);
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => {
        return route.outlet === 'primary';
      }),
      mergeMap(route => route.data)
    ).subscribe((data: any) => {
      // Access the route data here
      console.log(data);
      this.guardedRoute = data?.guarded || false;
    });
  }

  verifyHeader(component: any) {
    console.log(component);
    if(this.router.url.startsWith('/dashboard')) {
      this.showHeaderFooter.set(false);
    } else {
      this.showHeaderFooter.set(true);
    }
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }
}
