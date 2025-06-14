import { ErrorHandler, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { IAsset, IAudio, IImage, IImageEntity, IVideo } from '../models/dtos';
import { getImageInfo } from '../utils/img-util';
import { getProperties, getUrl, list } from 'aws-amplify/storage';
import { Utils } from './utils';
import DtoHelper from '../models/dto-heper';
import { FileService } from './file.service';
import { ImageService } from './image.service';
import { VideoService } from './video.service';
import { AssetError, AssetErrorCodes } from '../errors/upload-asset-error';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private fileService: FileService,
              private imageService: ImageService,
              private videoService: VideoService) {

  }

  async uploadAsset(file: File, payload: IAsset): Promise<IImage | IVideo | IAudio> {
    try {
      const { size, path, eTag } = await this.fileService.uploadFile(file);
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
        case 'AUDIO':
        //   return await this.audioService.addAudio(entity as IVideo);
        default:
          return entity as IAsset;
      }
    } catch (error) {
      console.error(error);
      throw new AssetError(AssetErrorCodes.UploadAssetFailed, error);
    }
  }

  async processImage(entity: IImage): Promise<IImage> {
    try {
      const result = await this.fileService.copyFileFromMedia(entity.assetPath!, 'IMAGE');
      const newImage = await this.imageService.addImage(entity);
      await this.fileService.deleteFile(entity.assetPath!);
      newImage.assetPath = result.path;
      newImage.url = Utils.getStaticLink(result.path);
      return await this.imageService.updateImage(newImage);
    } catch (error) {
      if (error instanceof AssetError) {
        switch (error.errorCode) {
          case AssetErrorCodes.AddImageDbFailed:
            this.handleAddImageDbFailedError(error);
            break;
          case AssetErrorCodes.UpdateImageDbFailed:
            this.handleUpdateImageDbFailedError(error);
            break;
          case AssetErrorCodes.CopyFileFromMediaFailed:
            this.handleCopyFileFromMediaError(error);
            break;
          default:
            this.unhandledProcessImageError(error);
            break;
        }
      }
      throw new AssetError(AssetErrorCodes.ProcessImageFailed, error);
    }
  }

  async processVideo(entity: IVideo): Promise<IVideo> {
    try {
      const result = await this.fileService.copyFileFromMedia(entity.assetPath!, 'VIDEO');
      const newVideo = await this.videoService.addVideo(entity);
      const updatedVideo = await this.videoService.updateVideo(newVideo);
      newVideo.assetPath = result.path;
      newVideo.url = Utils.getStaticLink(result.path);
      await this.fileService.deleteFile(entity.assetPath!);
      return updatedVideo;
    } catch (error) {
      if (error instanceof AssetError) {
        switch (error.errorCode) {
          case AssetErrorCodes.AddVideoDbFailed:
            this.handleAddVideoDbFailedError(error);
            break;
          case AssetErrorCodes.UpdateVideoDbFailed:
            this.handleUpdateVideoDbFailedError(error);
            break;
          case AssetErrorCodes.CopyFileFromMediaFailed:
            this.handleCopyFileFromMediaError(error);
            break;
          default:
            this.unhandledProcessVideoError(error);
            break;
        }
      }
      throw new AssetError(AssetErrorCodes.ProcessVideoFailed, error);
    }
  }

  private handleAddVideoDbFailedError(error: AssetError) {

  }

  private handleUpdateVideoDbFailedError(error: AssetError) {

  }

  private handleCopyFileFromMediaError(error: AssetError) {

  }

  private unhandledProcessVideoError(error: AssetError) {
    console.warn('unhandledProcessVideoError', error);
  }

  private handleAddImageDbFailedError(error: AssetError) {

  }

  private handleUpdateImageDbFailedError(error: AssetError) {

  }

  private unhandledProcessImageError(error: AssetError) {

  }
}
