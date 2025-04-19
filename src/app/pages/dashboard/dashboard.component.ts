import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DashboardToolbarComponent } from '../../components/dashboard-toolbar/dashboard-toolbar.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { selectIsLoggedIn } from '../../store/app.selectors';
import { AwsService } from '../../data/services/aws.service';
import { V6Client } from '@aws-amplify/api-graphql';
import type { Schema } from '../../../../amplify/data/resource';
import { DefaultCommonClientOptions } from '@aws-amplify/api-graphql/internals';

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
export class DashboardComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  private readonly unsubLoggedIn: Subscription;
  private client: V6Client<Schema, DefaultCommonClientOptions>;

  constructor(private router: Router,
              private awsService: AwsService,
              private store: Store) {
    this.client = this.awsService.awsClient;

    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.unsubLoggedIn = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if(!isLoggedIn){
        return this.router.navigate(['/login']);
      }
      return Promise.resolve(true);
    })
  }

  ngOnInit() {
    try {
      this.client.models.Image.observeQuery().subscribe({
        next: ({ items }) => {
          console.log('images', items);
        },
      });
      this.client.models.Video.observeQuery().subscribe({
        next: ({ items }) => {
          console.log('videos', items);
        },
      });
    } catch (error) {
      console.error('error fetching tasks', error);
    }
  }

  ngOnDestroy() {
    if(this.unsubLoggedIn){
      this.unsubLoggedIn.unsubscribe();
    }
  }
}
