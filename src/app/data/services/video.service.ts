import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {IVideo} from '../models/dtos';
import {environment} from '../../../environments/environment';
import { CACHING_ENABLED } from './http.interceptors';
import {mockData} from "./mock-data";

@Injectable({providedIn: 'root'})
export class VideoService {
  constructor(private httpClient: HttpClient) { }

  getVideo(id: string): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.videos.find(item => item.id === id ));
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/videos/${id}`, {
      context: new HttpContext().set(CACHING_ENABLED, false),
    });
  }

  getVideos(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.videos);
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/videos`);
  }

  getThumbnails(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/videos/thumbnails/${id}`);
  }

  getCategories(): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.categories);
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/common/categories`);
  }

  updateVideo(id: string, videoDto: IVideo): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}/videos/${id}`, videoDto);
  }

  deleteVideo(id: string) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/videos/${id}`);
  }

}
