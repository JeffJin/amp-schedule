export class AssetError extends Error {
  private readonly _errorCode: number;
  constructor(message: string, errorCode: number) {
    super(message);
    this.name = "AssetError";
    this._errorCode = errorCode;
  }

  get errorCode(): number {
    return this._errorCode;
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
  UploadMediaFailed: 9,
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

};
