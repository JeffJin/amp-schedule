export interface IAudio extends IEntity {
  encodedFilePath: string;
  cloudUrl: string;
  duration: number;
  category: string;
  type: string;
  title: string;
  description: string;
  tags: string;
}

export interface IDevice extends IEntity {
  serialNumber: string;
  deviceGroupName: string;
  organizationName: string;
  assetTag: string;
  deviceVersion: number;
  appVersion: number;
  locationId: string;
  activatedOn?: Date;
  // lastStatus?: DeviceStatusDto;
  isOnline?: boolean;
  // licenses?: Array<LicenseDto>;
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
  name: string;
  startDate: Date;
  endDate: Date;
  // daily start and end time in minutes, offset from midnight
  startTime: number;
  endTime: number;
  deviceGroups?: IGroup[];
  subPlaylists?: ISubPlaylist[];
}


export interface ISubPlaylist extends IEntity {
  playlistId: string;
  positionX: number; // top left corner in a screen
  positionY: number; // top left corner in a screen
  width: number; // 0 to 100 percentage
  height: number; // 0 to 100 percentage
  playlistItems?: IPlaylistItem[];
}

export interface IPlaylistItem extends IEntity {
  index: number;
  subPlaylistId: string;
  mediaAssetId: string; // media asset id
  assetDiscriminator: string; // Video, Audio or Image
  duration: number; // for how long the asset will be displayed since the media start time
  media: any;

  cacheLocation: string;
}

export interface ICustomer extends IEntity {
  name: string;
}

export interface ILocation extends IEntity {
  address: string;
  locale: string;
  timezoneOffset: number;
}

export interface IPlaylistGroup extends IEntity {
  playlistId: string;
  groupId: string;
}

export interface VisibleImage {
  id: string,
  url: string,
  width: number,
  height: number,
  description?: string;
  title?: string;
}

export interface IImage extends IEntity {
  cloudUrl: string;
  fileSize?: number;
  category?: string;
  type?: string;
  title: string;
  description?: string;
  tags?: string;
  width?: number;
  height?: number;
  assetType?: string;
}

export const VideoType = {
  IFrame: 'IFrame',
  Video: 'Video',
}

export interface IVideo extends IEntity {
  cloudUrl: string;
  encodedFilePath?: string;
  progressiveUrl?: string;
  hlsUrl?: string;
  duration?: number;
  sourceId?: string;
  fileType: string;
  category?: string;
  type?: string;
  title?: string;
  description?: string;
  tags?: string;
  mainThumbnail?: string;
  thumbnails?: string[];
  checked?: boolean;
  assetType?: string;
}

export interface IUser{
  userName: string;
  email: string;
  phoneNumber: string;
  profileLogo?: string;
  token?: string;
}

export interface IEntity{
  id?: string;
  createdOn?: Date | null;
  updatedOn?: Date | null;
  createdBy?: string;
  updatedBy?: string;
}

export interface ITimeZone {
  value: string,
  abbr: string,
  offset: number,
  isdst: boolean,
  text: string,
  utc: string[]
}
