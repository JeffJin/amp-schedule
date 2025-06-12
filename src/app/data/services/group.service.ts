import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { IGroup} from '../models/dtos';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs';
import {mockData} from "./mock-data";

@Injectable()
export class GroupService {

  constructor(private httpClient: HttpClient) { }

}
