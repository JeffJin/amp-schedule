import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { mockData } from './mock-data';
import { IAudio } from '../models/dtos';

@Injectable()
export class AudioService {


  constructor(private httpClient: HttpClient) {
  }

  getAudios(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.audios);
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/audios`);
  }

  getAudio(id: string): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.audios.find(item => item.id === id));
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/audios/${id}`);
  }

  updateAudio(id: string, audioDto: IAudio): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}/audios/${id}`, audioDto);
  }

  deleteAudio(id: string) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/audios/${id}`);
  }
}
