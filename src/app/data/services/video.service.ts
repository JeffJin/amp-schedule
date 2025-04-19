import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { IImage, IVideo, IVideoEntity } from '../models/dtos';
import { V6Client } from '@aws-amplify/api-graphql';
import type { Schema } from '../../../../amplify/data/resource';
import { DefaultCommonClientOptions } from '@aws-amplify/api-graphql/internals';
import { AwsService } from './aws.service';
import { list } from 'aws-amplify/storage';
import { Utils } from './utils';
import DtoHelper from '../models/dto-heper';

@Injectable({ providedIn: 'root' })
export class VideoService {
  private client: V6Client<Schema, DefaultCommonClientOptions>;

  constructor(private awsService: AwsService) {
    this.client = this.awsService.awsClient;

  }

  async getVideosPromise(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Promise<IVideo[]> {
    const { items } = await list({
      path: ({ identityId }) => `videos/${ identityId }/`
    });
    console.log(`total ${ items.length } videos are loaded`);
    const results: IVideo[] = [];
    for (const item of items) {
      const href = await Utils.getLink(item.path);
      results.push({
        title: '',
        description: '',
        url: href,
        fileSize: 0,
        fileType: '',
        duration: 0,
        assetPath: item.path,
        eTag: item.eTag,
        privacySetting: 'PRIVATE',
      });
    }
    return results;
  }

  getVideos(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Observable<IVideo[]> {
    const result = this.getVideosPromise(pageIndex, pageSize, isPrivate);
    return from(result);
  }

  async addVideo(video: IVideo): Promise<IVideo> {
    const entity = DtoHelper.convertToVideoEntity(video);
    const { data, errors } = await this.client.models.Video.create(entity);
    if (errors) {
      console.error('video failed to create', errors);
      throw errors;
    } else {
      return DtoHelper.convertToVideoModel(data as IVideoEntity);
    }
  }

  async updateVideo(video: IVideo): Promise<IVideo> {
    const entity = DtoHelper.convertToVideoEntity(video);
    const { data, errors } = await this.client.models.Video.update({ ...entity, id: video.id! });
    if (errors) {
      console.error('video failed to update', errors);
      return Promise.reject(errors);
    } else {
      console.log('video updated successfully', data);
      return DtoHelper.convertToVideoModel(data as IVideoEntity);
    }
  }


  async deleteVideo(id: string): Promise<boolean> {
    const { data, errors } = await this.client.models.Image.delete({ id });
    if (errors) {
      console.error('video failed to delete', errors);
      throw errors;
    } else {
      console.log('video successfully deleted', data);
      return true;
    }
  }

  async getVideoDetailsPromise(videoId: string): Promise<IVideo> {
    const { data: video, errors } = await this.client.models.Video.get({
      id: videoId,
    });
    //TODO
    return video as unknown as IVideo;
  }

  getVideoDetails(imageId: string): Observable<IImage> {
    const promise = this.getVideoDetailsPromise(imageId);
    return from(promise);
  }
}
