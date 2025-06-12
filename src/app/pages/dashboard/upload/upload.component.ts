import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { V6Client } from '@aws-amplify/api-graphql';
import type { Schema } from '../../../../../amplify/data/resource';
import { DefaultCommonClientOptions } from '@aws-amplify/api-graphql/internals';
import { AwsService } from '../../../data/services/aws.service';
import { Subscription } from 'rxjs';
import { AssetService } from '../../../data/services/asset.service';
import { RouterOutlet } from '@angular/router';
import { ImageSettingsComponent } from './image-settings/image-settings.component';
import {
  IAudio,
  IAudioSettings,
  IDocumentSettings,
  IImage, IImageEntity,
  IImageSettings,
  IVideo, IVideoEntity,
  IVideoSettings
} from '../../../data/models/dtos';
import { VideoSettingsComponent } from './video-settings/video-settings.component';
import { DocumentSettingsComponent } from './document-settings/document-settings.component';
import { AudioSettingsComponent } from './audio-settings/audio-settings.component';
import DtoHelper from '../../../data/models/dto-heper';

@Component({
  selector: 'app-upload',
  imports: [
    FormsModule,
    JsonPipe,
    ImageSettingsComponent,
    VideoSettingsComponent,
    DocumentSettingsComponent,
    AudioSettingsComponent,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit, OnDestroy {
  asset: IVideo | IAudio | IImage = {
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
  private updateImageSub?: Subscription | null;
  private updateVideoSub?: Subscription | null;
  private updateAudioSub?: Subscription | null;
  imageSettings: IImageSettings = {
    width: 0,
    height: 0,
  };
  audioSettings: IAudioSettings = {
    duration: 0,
  };
  videoSettings: IVideoSettings = {
    duration: 0,
    videoSetting: 'Movie',
    youtubeUrl: '',
    tags: []
  };
  documentSettings: IDocumentSettings = {};

  constructor(private awsService: AwsService,
              private assetService: AssetService) {
    this.client = this.awsService.awsClient;
  }

  ngOnInit() {

    this.updateImageSub = this.client.models.Image.onUpdate().subscribe({
      next: (data) => {
        console.log('onUpdateImage', data);
        this.asset = DtoHelper.convertToImageModel(data as IImageEntity);
      },
      error: (error) => console.warn(error),
    });

    this.updateVideoSub = this.client.models.Video.onUpdate().subscribe({
      next: (data) => {
        console.log('onUpdateVideo', data);
        this.asset = DtoHelper.convertToVideoModel(data as unknown as IVideoEntity);
      },
      error: (error) => console.warn(error),
    });

  }

  async onFileSelected(event: any) {
    event.preventDefault();
    const file: File = event.target.files[0];
    this.asset.title = file.name;
    const result = await this.assetService.uploadAsset(file, this.asset);
    console.log('result', result);
    this.asset = result;
  }

  ngOnDestroy() {
    if(this.updateImageSub){
      this.updateImageSub.unsubscribe();
    }
    if(this.updateVideoSub){
      this.updateVideoSub.unsubscribe();
    }
  }
}
