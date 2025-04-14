import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { IImage } from '../models/dtos';
import { environment } from '../../../environments/environment';
import { getImageInfo } from '../utils/img-util';
import { mockData } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  getImages(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Observable<IImage[]> {
    return this.httpClient.get<IImage[]>(`${environment.apiBaseUrl}/images`);
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
    const imgPromise: Promise<IImage> = getImageInfo(image.cloudUrl)
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
