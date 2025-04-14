import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements AfterViewInit {
  constructor(private store: Store) {

  }

  ngAfterViewInit() {

  }
}
