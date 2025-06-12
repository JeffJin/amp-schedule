import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { IDevice } from '../models/dtos';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { mockData } from './mock-data';

@Injectable()
export class DeviceService {


  constructor(private httpClient: HttpClient) {
  }

}
