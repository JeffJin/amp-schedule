import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';

@Component({
  selector: 'app-image-details',
  imports: [],
  templateUrl: './image-details.component.html',
  styleUrl: './image-details.component.scss'
})
export class ImageDetailsComponent implements OnInit {
  imageId = '';

  constructor(private store: Store) {
  }

  ngOnInit() {

    const {
      selectCurrentRoute, // select the current route
      selectQueryParams, // select the current route query params
      selectQueryParam, // factory function to select a query param
      selectRouteParams, // select the current route params
      selectRouteParam, // factory function to select a route param
      selectUrl, // select the current url
      selectTitle, // select the title if available
    } = getRouterSelectors();
    const routeParams$ = this.store.select(selectRouteParams);
    routeParams$.subscribe((params) => {
      console.log('ImageDetailsComponent params', params);
      this.imageId = params['imageId'];
    });

    this.store.select(selectUrl).subscribe(url => {
      console.log('ImageDetailsComponent selectUrl', url);
    });
  }
}
