import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
  }
)
export class AssetQuery {


  constructor(private httpClient: HttpClient) {
  }

  getAssets(): Observable<any> {
    const query = {
      "query": "{ listAssets { items { PK AssetType Category CloudUrl CreatedBy CreatedOn Description Duration Height Tags ThumbnailLink Title Width } } }",
      "variables": null,
      "operationName": null
    };

    return this.httpClient.post(`${environment.awsApiUrl}`, query);
  }

  getUsers(): Observable<any> {
    const query = {
      "query": "{ listUsers { items { PK SK } } }",
      "variables": null,
      "operationName": null
    };

    return this.httpClient.post(`${environment.awsApiUrl}`, query);
  }
}
