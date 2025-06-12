import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ILocation, ITimeZone } from '../models/dtos';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class LocationService {

  constructor(private httpClient: HttpClient) {
  }

}
