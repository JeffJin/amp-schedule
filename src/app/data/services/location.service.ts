import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ILocation, ITimeZone } from '../models/dtos';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { mockData } from './mock-data';

@Injectable()
export class LocationService {

  constructor(private httpClient: HttpClient) {
  }

  addLocation(dto: any): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/locations/`, dto);
  }

  loadLocations(): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.locations);
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/locations/`);
  }

  searchLocations(keywords: string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/locations/search?keywords=${keywords}`);
  }

  getLocation(id: string): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.locations.find(item => item.id === id));
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/locations/${id}`);
  }

  updateLocation(id: string, dto: ILocation): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}/locations/${id}`, dto);
  }

  deleteLocation(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiBaseUrl}/locations/${id}`);
  }

  getTimezones(): Observable<any> {
    return this.httpClient.get('assets/timezones.json');
  }

  getTimezoneInfo(offset: number): any {
    return this.httpClient.get('assets/timezones.json')
      .subscribe((results: any) => {
        console.log(results);
        return results.find((r: ITimeZone) => r.offset === offset);
      });
  }
}
