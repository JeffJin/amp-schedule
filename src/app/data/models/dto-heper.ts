import {
  IAudio, IAudioEntity,
  ICommercial, ICommercialEntity,
  IDevice, IDeviceEntity,
  IImage, IImageEntity,
  IPlaylist, IPlaylistEntity,
  ITag, ITagEntity,
  IVideo, IVideoEntity
} from './dtos';

const convertToVideoEntity = (video: IVideo): IVideoEntity => {
  if(!video) {
    throw new Error('Video is null');
  }
  const entity = {
    title: video.title,
    assetPath: video.assetPath,
    description: video.description,
    youtubeUrl: video.youtubeUrl,
    url: video.url!,
    duration: video.duration,
    fileSize: video.fileSize,
    fileType: video.fileType,
    thumbnailUrls: video.thumbnailUrls,
    videoSetting: video.videoSetting,
    privacySetting: video.privacySetting,
  };
  if(video.id) {
    return {
      ...entity,
      id: video.id!,
    }
  }
  return entity;
}

const convertToDeviceEntity = (device: IDevice): IDeviceEntity => {
  if(!device) {
    throw new Error('Device is null');
  }
  const entity = {
    serialNumber: device.serialNumber!,
    title: device.title,
    description: device.description,
    deviceGroup: device.deviceGroup,
    organization: device.organization,
    assetTag: device.assetTag,
    deviceVersion: device.deviceVersion,
    appVersion: device.appVersion,
    activatedOn: device.activatedOn,
    isOnline: device.isOnline,
  };
  if(device.id) {
    return {
      ...entity,
      id: device.id!,
    }
  }
  return entity;
};

const convertToCommercialEntity = (commercial: ICommercial): ICommercialEntity => {
  if(!commercial) {
    throw new Error('Commercial is null');
  }
  const entity = {
    startTime: commercial.startTime!,
    endTime: commercial.endTime,
    video: commercial.video ? convertToVideoEntity(commercial.video) : undefined,
  };
  if(commercial.id) {
    return {
      ...entity,
      id: commercial.id!,
    }
  }
  return entity;
};

const convertToPlaylistEntity = (playlist: IPlaylist): IPlaylistEntity => {
  if(!playlist) {
    throw new Error('Playlist is null');
  }
  const entity = {
    title: playlist.title,
    description: playlist.description,
    startTime: playlist.startTime,
    endTime: playlist.endTime,
    privacySetting: playlist.privacySetting,
  }
  if(playlist.id) {
    return {
      ...entity,
      id: playlist.id!,
    }
  }
  return entity;
}

const convertToTagEntity = (tag: ITag): ITagEntity => {
  const entity = {
    name: tag.name,
  };
  if(tag.id) {
    return {
      ...entity,
      id: tag.id!,
    }
  }
  return entity;
}

const convertToImageEntity = (image: IImage): IImageEntity  => {
  if(!image) {
    throw new Error('Image is null');
  }
  const entity = {
    title: image.title,
    assetPath: image.assetPath,
    description: image.description,
    url: image.url!,
    width: image.width,
    height: image.height,
    fileType: image.fileType,
    fileSize: image.fileSize,
    privacySetting: image.privacySetting,
  };
  if(image.id) {
    return {
      ...entity,
      id: image.id!,
    }
  }
  return entity;
}

const convertToAudioEntity = (audio: IAudio): IAudioEntity  => {
  if(!audio) {
    throw new Error('Audio is null');
  }
  const entity = {
    title: audio.title,
    assetPath: audio.assetPath,
    duration: audio.duration,
    description: audio.description,
    url: audio.url!,
    fileType: audio.fileType,
    fileSize: audio.fileSize,
    privacySetting: audio.privacySetting,
  }
  if(audio.id) {
    return {
      ...entity,
      id: audio.id!,
    }
  }
  return entity;
}

const convertToAudioModel = (audio: IAudioEntity): IAudio  => {
  if(!audio) {
    throw new Error('Audio is null');
  }
  return {
    id: audio.id!,
    title: audio.title,
    assetPath: audio.assetPath,
    duration: audio.duration,
    description: audio.description,
    url: audio.url!,
    fileType: audio.fileType,
    fileSize: audio.fileSize,
    privacySetting: audio.privacySetting,
  }
}

const convertToVideoModel = (video: IVideoEntity): IVideo => {
  if(!video) {
    throw new Error('Video is null');
  }
  return {
    id: video.id!,
    title: video.title,
    assetPath: video.assetPath,
    description: video.description,
    youtubeUrl: video.youtubeUrl,
    url: video.url!,
    duration: video.duration,
    fileSize: video.fileSize,
    fileType: video.fileType,
    thumbnailUrls: video.thumbnailUrls,
    videoSetting: video.videoSetting,
    privacySetting: video.privacySetting,
  }
}

const convertToImageModel = (image: IImageEntity): IImage => {
  if(!image) {
    throw new Error('Image is null');
  }
  return {
    id: image.id!,
    title: image.title,
    assetPath: image.assetPath,
    description: image.description,
    url: image.url!,
    width: image.width,
    height: image.height,
    fileType: image.fileType,
    fileSize: image.fileSize,
    privacySetting: image.privacySetting,
  }
}

const DtoHelper = {
  convertToVideoEntity,
  convertToImageEntity,
  convertToAudioEntity,
  convertToVideoModel,
  convertToImageModel,
  convertToAudioModel,
  convertToDeviceEntity,
  convertToCommercialEntity,
  convertToPlaylistEntity,
  convertToTagEntity,
}
export default DtoHelper;
