import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AssetQuery } from '../../../data/services/aws-graph/asset-query';

@Component({
  selector: 'app-users',
  imports: [
    JsonPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  constructor(private assetQuery: AssetQuery) {
  }
  assets: any[] = [];
  ngOnInit() {
    this.assetQuery.getAssets().subscribe((results) => {
      this.assets = results;
    })
  }
}
