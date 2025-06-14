export class AssetError extends Error {
  private readonly _errorCode: number;
  private readonly _error: any;
  constructor(errorCode: number, error: any = null, message: string = '') {
    super(message);
    this._error = error;
    this.name = "AssetError";
    this._errorCode = errorCode;
  }

  get errorCode(): number {
    return this._errorCode;
  }

  get error(): number {
    return this._error;
  }
}

export const AssetErrorCodes = {
  InvalidFile: 1,
  InvalidImage: 2,
  InvalidVideo: 3,
  InvalidAudio: 4,
  InvalidDocument: 5,
  InvalidOther: 6,
  Unknown: 7,
  MaxFileSizeExceeded: 8,
  UploadAssetFailed: 9,
  ProcessImageFailed: 10,
  ProcessVideoFailed: 11,
  ProcessAudioFailed: 12,
  ProcessDocumentFailed: 13,
  AddImageDbFailed: 14,
  AddVideoDbFailed: 15,
  AddAudioDbFailed: 16,
  AddDocumentDbFailed: 17,
  UpdateImageDbFailed: 18,
  UpdateVideoDbFailed: 19,
  UpdateAudioDbFailed: 20,
  UpdateDocumentDbFailed: 21,
  DeleteVideoDbFailed: 22,
  DeleteImageDbFailed: 23,
  DeleteAudioDbFailed: 24,
  DeleteDocumentDbFailed: 25,
  CopyFileFromMediaFailed: 26,
  DeleteFileFromS3Failed: 27
};
