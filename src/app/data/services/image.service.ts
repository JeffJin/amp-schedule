import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { IImage, IImageEntity } from '../models/dtos';
import { environment } from '../../../environments/environment';
import { getImageInfo } from '../utils/img-util';
import { mockData } from './mock-data';
import { AwsService } from './aws.service';
import { getUrl, list } from 'aws-amplify/storage';
import { Utils } from './utils';
import { V6Client } from '@aws-amplify/api-graphql';
import type { Schema } from '../../../../amplify/data/resource';
import { DefaultCommonClientOptions } from '@aws-amplify/api-graphql/internals';
import DtoHelper from '../models/dto-heper';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private client: V6Client<Schema, DefaultCommonClientOptions>;

  constructor(private awsService: AwsService) {
    this.client = this.awsService.awsClient;

  }

  async getImagesPromise(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Promise<IImage[]> {
    const { items } = await list({
      path: ({identityId}) => `images/${identityId}/`
    });
    console.log(`total ${items.length} images are loaded`);
    const results:IImage[] = []
    for (const item of items) {
      const href = await Utils.getLink(item.path);
      results.push({
        title: '',
        description: '',
        url: href,
        fileSize: 0,
        fileType: '',
        width: 0,
        height: 0,
        assetPath: item.path,
        eTag: item.eTag,
        privacySetting: 'PRIVATE',
      });
    }
    return results;
  }

  getImages(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Observable<IImage[]> {
    const result = this.getImagesPromise(pageIndex, pageSize, isPrivate);
    return from(result);
  }

  async addImage(image: IImage): Promise<IImage> {
    const entity = DtoHelper.convertToImageEntity(image);
    const { data, errors } = await this.client.models.Image.create(entity);
    if (errors) {
      console.error('image failed to create', errors);
      throw errors;
    } else {
      return DtoHelper.convertToImageModel(data as IImageEntity);
    }
  }

  async updateImage(image: IImage): Promise<IImage> {
    const entity = DtoHelper.convertToImageEntity(image);
    const { data, errors } = await this.client.models.Image.update({ ...entity, id: image.id! });
    if (errors) {
      console.error('image failed to update', errors);
      throw errors;
    } else {
      return DtoHelper.convertToImageModel(data as IImageEntity);
    }
  }

  async deleteImage(id: string): Promise<boolean> {
    const { data, errors } = await this.client.models.Image.delete({ id });
    if (errors) {
      console.error('image failed to update', errors);
      throw errors;
    } else {
      console.log('image successfully deleted', data);
      return true;
    }
  }

  updateImageSize(image: IImage): Observable<IImage> {
    const imgPromise: Promise<IImage> = getImageInfo(image.url!)
      .then((imgInfo) => {
          if (imgInfo == null) {
            return {
              ...image,
              width: 0,
              height: 0,
            } as IImage;
          }
          return {
            ...image,
            width: imgInfo.naturalWidth,
            height: imgInfo.naturalHeight,
          } as IImage;
        }
      ).catch((err) => {
          return {
            ...image,
            width: 0,
            height: 0,
          } as IImage;
        }
      );
    return from(imgPromise);
  }

  async getImageDetailsPromise(imageId: string): Promise<IImage> {
    const { data: image, errors } = await this.client.models.Image.get({
      id: imageId,
    });
    return image as IImage;
  }

  getImageDetails(imageId: string): Observable<IImage> {
    const promise = this.getImageDetailsPromise(imageId);
    return from(promise);
  }
}
