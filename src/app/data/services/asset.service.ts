import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { IAsset, IAudio, IImage, IImageEntity, IVideo } from '../models/dtos';
import { getImageInfo } from '../utils/img-util';
import { getProperties, getUrl, list } from 'aws-amplify/storage';
import { Utils } from './utils';
import DtoHelper from '../models/dto-heper';
import { FileService } from './file.service';
import { ImageService } from './image.service';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private fileService: FileService,
              private imageService: ImageService,
              private videoService: VideoService) {

  }

  async uploadAsset(file: File, payload: any): Promise<IImage | IVideo | IAudio | null> {
    try {
      const { size, path, eTag} = await this.fileService.uploadFile(file);
      const props = await getProperties({ path });
      console.log(size, path, eTag, props);
      const entity = {
        title: payload.title,
        description: payload.description,
        privacySetting: payload.privacySetting,
        url: Utils.getStaticLink(path),
        assetPath: path,
        eTag: eTag,
        fileSize: size,
        fileType: Utils.getFileType(path),
      };

      switch (entity.fileType) {
        case 'IMAGE':
          return await this.processImage(entity as IImage);
        case 'VIDEO':
          return await this.processVideo(entity as IVideo);
        // case 'mp3':
        //   return await this.audioService.addAudio(entity as IVideo);
        default:
          return entity as IAsset;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async processImage(entity: IImage): Promise<IImage> {
    try {
      const newImage = await this.imageService.addImage(entity);
      const result = await this.fileService.copyFileFromMedia(entity.assetPath!, 'IMAGE');
      await this.fileService.deleteFile(entity.assetPath!);
      newImage.assetPath = result.path;
      newImage.url = Utils.getStaticLink(result.path);
      return await this.imageService.updateImage(newImage);
    } catch (error) {
      throw error;
    }
  }

  async processVideo(entity: IVideo): Promise<IVideo> {
    try {
      const newVideo = await this.videoService.addVideo(entity);
      const result = await this.fileService.copyFileFromMedia(entity.assetPath!, 'VIDEO');
      await this.fileService.deleteFile(entity.assetPath!);
      newVideo.assetPath = result.path;
      newVideo.url = Utils.getStaticLink(result.path);
      return await this.videoService.updateVideo(newVideo);
    } catch (error) {
      throw error;
    }
  }
}
