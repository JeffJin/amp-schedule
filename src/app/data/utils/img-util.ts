export function getImageInfo(url: string): Promise<ImageInfo | null> {
  const img = new Image();
  const promise = new Promise<ImageInfo | null>((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = err => {
      reject(err);
    };
    img.src = url;
  });
  return promise;
}

export interface ImageInfo {
  naturalWidth: number;
  naturalHeight: number;
  localName: string,
  longDesc: string,
}
