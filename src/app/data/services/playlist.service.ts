import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IPlaylist } from '../models/dtos';
import { mockData } from './mock-data';

@Injectable()
export class PlaylistService {

  constructor(private httpClient: HttpClient) {
  }

}
