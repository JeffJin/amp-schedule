import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { IDevice } from '../models/dtos';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { mockData } from './mock-data';

@Injectable()
export class DeviceService {


  constructor(private httpClient: HttpClient) {
  }

  getDevices(pageIndex: number = 0, pageSize: number = 12): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.devices);
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/devices`);
  }

  getDevice(serialNumber: string): Observable<IDevice> {
    return this.httpClient.get<IDevice>(`${environment.apiBaseUrl}/devices/${serialNumber}`);
  }

  registerDevice(dto: IDevice): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/devices/`, dto);
  }

  updateDevice(id: string, dto: IDevice): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}/devices/${id}`, dto);
  }

  deleteDevice(id: string) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/devices/${id}`);
  }


  getDeviceStatus(serialNumber: string) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/devices/status/${serialNumber}`);
  }
}
