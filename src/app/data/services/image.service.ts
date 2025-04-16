import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { IImage } from '../models/dtos';
import { environment } from '../../../environments/environment';
import { getImageInfo } from '../utils/img-util';
import { mockData } from './mock-data';
import { AwsService } from './aws.service';
import { getUrl, list } from 'aws-amplify/storage';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  constructor(private httpClient: HttpClient, private awsService: AwsService) {

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
        path: item.path,
        eTag: item.eTag,
        privacySetting: 'public',
      });
    }
    return results;
  }

  getImages(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Observable<IImage[]> {
    const result = this.getImagesPromise(pageIndex, pageSize, isPrivate);
    return from(result);
  }

  getImage(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/images/${id}`);
  }

  updateImage(id: string, imageDto: IImage): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}/images/${id}`, imageDto);
  }

  deleteImage(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiBaseUrl}/images/${id}`);
  }

  updateImageSize(image: IImage): Observable<IImage> {
    const imgPromise: Promise<IImage> = getImageInfo(image.url)
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
}
