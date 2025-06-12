import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { mockData } from './mock-data';
import { IAudio } from '../models/dtos';

//DynamoDB operations for audio entities


@Injectable()
export class AudioService {


  constructor(private httpClient: HttpClient) {
  }


}
