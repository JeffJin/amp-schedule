import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { V6Client } from '@aws-amplify/api-graphql';
import type { Schema } from '../../../../../amplify/data/resource';
import { DefaultCommonClientOptions } from '@aws-amplify/api-graphql/internals';
import { AwsService } from '../../../data/services/aws.service';
import { Subscription } from 'rxjs';
import { AssetService } from '../../../data/services/asset.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-upload',
  imports: [
    FormsModule,
    JsonPipe,
    RouterOutlet,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
  asset = {
    title: '',
    description: '',
    privacySetting: 'PRIVATE',
    url: '',
    assetPath: '',
    eTag: '',
    fileSize: 0,
    fileType: 'N/A',
  };
  private client: V6Client<Schema, DefaultCommonClientOptions>;
  private listSub?: Subscription | null;
  private createSub?: Subscription | null;
  private updateSub?: Subscription | null;
  private deleteSub?: Subscription | null;

  constructor(private awsService: AwsService,
              private assetService: AssetService) {
    this.client = this.awsService.awsClient;
  }

  ngOnInit() {

    this.createSub = this.client.models.Image.onCreate().subscribe({
      next: (data) => console.log('onCreate', data),
      error: (error) => console.warn(error),
    });

    this.updateSub = this.client.models.Image.onUpdate().subscribe({
      next: (data) => console.log('onUpdate', data),
      error: (error) => console.warn(error),
    });

    this.deleteSub = this.client.models.Image.onDelete().subscribe({
      next: (data) => console.log('onDelete', data),
      error: (error) => console.warn(error),
    });
  }

  async onFileSelected(event: any) {
    event.preventDefault();
    const file: File = event.target.files[0];
    const result = await this.assetService.uploadAsset(file, this.asset);
    console.log('result', result);
  }
}
