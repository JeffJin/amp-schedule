import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, last, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class FileService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    const options = {
      reportProgress: true,
      headers: headers
    };
    const req = new HttpRequest('POST', `${environment.apiBaseUrl}/files/upload`, formData, options);
    return this.httpClient.request(req).pipe(
      // map(event => this.getEventMessage(event)),
      tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
      // catchError(this.handleError(formData))
    );
  }

  //TODO
  private showProgress(message: any) {

  }

  private getEventMessage(event: any, file: any) {
    return undefined;
  }

  private handleError(file: any) {

  }
}
