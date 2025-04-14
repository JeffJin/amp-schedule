import { Injectable } from '@angular/core';
import {HubConnectionBuilder} from '@microsoft/signalr';

@Injectable()
export class SignalrService {

  constructor() { }

  getHubConnectionBuilder() {
    return new HubConnectionBuilder();
  }
}
