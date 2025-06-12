import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, last, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { copy, CopyWithPathOutput, remove, RemoveWithPathOutput, uploadData } from 'aws-amplify/storage';
import { ItemWithPath } from '@aws-amplify/storage/src/providers/s3/types/outputs';

//aws s3 storage operations for asset files

@Injectable(
  {
    providedIn: 'root'
  }
)
export class FileService {

  constructor(private httpClient: HttpClient) { }

  async uploadFile(file: File): Promise<ItemWithPath> {
    if (file && file.size > 0) {
      const result = await uploadData({
        data: file,
        path: `media/${ file.name }`,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${ Math.round(
                  (transferredBytes / totalBytes) * 100
                ) } %`
              );
            }
          },
        }
      }).result;
      console.log('Complete file read successfully!', result);
      return result;
    }
    throw 'Invalid file size';
  }

  async copyFileFromMedia(assetPath: string, type: string): Promise<CopyWithPathOutput> {
    let path = '';
    switch (type) {
      case 'IMAGE':
        path = 'images';
        break;
      case 'VIDEO':
        path = 'videos';
        break;
      case 'AUDIO':
        path = 'audios';
        break;
      case 'DOCUMENT':
        path = 'documents';
        break;
      default:
          path = '';
    }
    if(path === '') {
      throw 'Invalid type';
    }
    const fileName = assetPath.split('/').pop();
    try {
      return await copy({
        source: {
          path: `${assetPath}`,
        },
        destination: {
          path: ({identityId}) => `${path}/${identityId}/${encodeURIComponent(fileName!)}`
        },
      });
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  async deleteFile(path: string): Promise<RemoveWithPathOutput> {
    try {
      return await remove({ path });
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }
}
