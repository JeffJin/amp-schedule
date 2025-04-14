import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';

@Injectable()
export class MessageQueueService {

  constructor(private cacheService: StorageService) {

  }

}
