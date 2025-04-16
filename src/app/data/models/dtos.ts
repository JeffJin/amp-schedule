import { a } from '@aws-amplify/backend';

export interface ITask extends IEntity {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  notes: string;
}

export interface IAudio extends IEntity {
  title: string,
  description: string,
  duration: number,
  url: string,
  fileSize: string,
  fileType: string,
  privacySetting: string,
}

export interface IDevice extends IEntity {
  serialNumber: string,
  title: string,
  description: string,
  deviceGroup: string,
  organization: string,
  assetTag: string,
  deviceVersion: string,
  appVersion: string,
  locationId: string,
  activatedOn: Date,
  isOnline: boolean,
  playlists?: IPlaylist[],
}

export interface ILicense extends IEntity {
  deviceId: string;
  type: string;
  expireOn: Date;
}


export interface IDeviceStatus extends IEntity {
  deviceId: string;
  status: string;
}

export interface IGroup extends IEntity {
  name: string;
  numOfDevices?: number;
  numOfPlaylists?: number;
}

export interface IPlaylist extends IEntity {
  title: string,
  description: string,
  videos: IVideo[],
  startTime: Date,
  endTime: Date,
  privacySetting: string,
  devices: IDevice[],
  // commercials: ICommercial[],
}

export interface ICustomer extends IEntity {
  name: string;
}

export interface ILocation extends IEntity {
  address: string;
  locale: string;
  timezoneOffset: number;
}

export interface IImage extends IEntity {
  path: string;
  url: string;
  fileSize?: number;
  fileType?: string;
  title: string;
  description?: string;
  width?: number;
  height?: number;
  privacySetting?: string;
}

export const VideoType = {
  IFrame: 'IFrame',
  Video: 'Video',
}

export interface IVideo extends IEntity {
  path: string;
  url: string;
  fileSize?: number;
  fileType?: string;
  title: string;
  description?: string;
  privacySetting?: string;
  duration?: number;
  type?: string;
  tags?: string;
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

export interface IEntity{
  id?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  owner?: string;
  eTag?: string | undefined;
}

export interface ITimeZone {
  value: string,
  abbr: string,
  offset: number,
  isdst: boolean,
  text: string,
  utc: string[]
}
