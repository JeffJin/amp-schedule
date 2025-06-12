import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ICustomer, IDevice } from '../models/dtos';
import { Observable } from 'rxjs';
import { mockData } from './mock-data';

@Injectable()
export class CustomerService {


  constructor(private httpClient: HttpClient) {
  }

}
