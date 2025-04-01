import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../../../amplify/data/resource';
import { CommonPublicClientOptions, DefaultCommonClientOptions } from '@aws-amplify/api-graphql/internals';
import { V6Client } from '@aws-amplify/api-graphql';

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  private readonly client: V6Client<Schema, DefaultCommonClientOptions>;

  constructor() {
    this.client = generateClient<Schema>();
  }

  get awsClient() {
    return this.client;
  }
}
