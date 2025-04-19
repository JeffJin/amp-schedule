
export interface ITask extends IModel {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  notes: string;
}

export interface IDevice extends IModel {
  serialNumber: string,
  title: string,
  description?: string,
  deviceGroup?: string,
  organization?: string,
  assetTag?: string,
  deviceVersion?: string,
  appVersion?: string,
  locationId?: string,
  activatedOn?: Date,
  isOnline?: boolean,
  playlists?: IPlaylist[],
}

export interface IDeviceEntity {
  id?: string,
  serialNumber: string,
  title: string,
  description?: string,
  deviceGroup?: string,
  organization?: string,
  assetTag?: string,
  deviceVersion?: string,
  appVersion?: string,
  locationId?: string,
  activatedOn?: Date,
  isOnline?: boolean,
  playlists?: IPlaylist[],
}

export interface ILicense extends IModel {
  deviceId: string;
  type: string;
  expireOn: Date;
}


export interface IDeviceStatus extends IModel {
  deviceId: string;
  status: string;
}

export interface IGroup extends IModel {
  name: string;
  numOfDevices?: number;
  numOfPlaylists?: number;
}

export interface IPlaylistEntity {
  id?: string,
  title: string,
  description?: string,
  videos?: IVideoEntity[],
  startTime?: Date,
  endTime?: Date,
  privacySetting?: string,
  devices?: IDeviceEntity[],
  commercials?: ICommercialEntity[],
}

export interface IPlaylist extends IModel {
  title: string,
  description?: string,
  videos?: IVideo[],
  startTime?: Date,
  endTime?: Date,
  privacySetting?: string,
  devices?: IDevice[],
  commercials?: ICommercial[],
}

export interface ICommercialEntity {
  id?: string,
  startTime?: Date,
  endTime?: Date,
  video?: IVideoEntity,
  playlists?: IPlaylistEntity[],
}

export interface ICommercial extends IModel {
  startTime?: Date,
  endTime?: Date,
  video?: IVideo,
  playlists?: IPlaylist[],
}

export interface ICustomer extends IModel {
  name: string;
}

export interface ILocation extends IModel {
  address: string;
  locale: string;
  timezoneOffset: number;
}

export type VideoType = {
  IFrame: 'IFrame',
  Video: 'Video',
}

export type PrivacySetting = 'PUBLIC' | 'PRIVATE' | 'ORGANIZATION_ONLY' | null | undefined;
export type VideoSetting = 'COMMERCIAL' | 'MOVIE' | null | undefined;
export type TaskStatus = 'COMPLETED' | 'TODO' | 'IN_PROGRESS' | 'BLOCKED' | null | undefined;

export interface IAsset extends IModel {
  assetPath: string,
  title: string,
  description?: string,
  url: string,
  fileSize?: number,
  fileType?: string,
  privacySetting: PrivacySetting,
}

export interface IAssetEntity {
  id?: string,
  title: string,
  description?: string,
  assetPath: string,
  url: string,
  fileSize?: number,
  fileType?: string,
  privacySetting?: PrivacySetting,
}

export interface IAudioEntity extends IAssetEntity {
  duration?: number,
}

export interface IAudio extends IAsset {
  duration?: number,
}

export interface IImage extends IAsset {
  width?: number;
  height?: number;
}

export interface IImageEntity extends IAssetEntity {
  width?: number;
  height?: number;
}

export interface ITag extends IModel {
  name: string;
  videos?: IVideo[];
}

export interface ITagEntity {
  id?: string;
  name?: string;
  videos?: IVideoEntity[];
}

export interface IVideoEntity extends IAssetEntity {
  duration?: number;
  youtubeUrl?: string;
  videoSetting?: VideoSetting;
  mainThumbnail?: string;
  thumbnailUrls?: string[];
}

export interface IVideo extends IAsset {
  duration?: number;
  youtubeUrl?: string;
  tags?: ITag[];
  videoSetting?: VideoSetting;
  mainThumbnail?: string;
  thumbnailUrls?: string[];
  playlist?: IPlaylist;
}

export interface IUser{
  id: string;
  userName: string;
  email?: string;
  phoneNumber?: string;
  profileLogo?: string;
  authType?: string;
}

export interface IModel {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  owner?: string;
  eTag?: string | undefined;
}

export interface ITimeZone {
  id: string,
  value: string,
  abbr: string,
  offset: number,
  isdst: boolean,
  text: string,
  utc: string[]
}
