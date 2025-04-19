import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { IImage } from '../../data/models/dtos';
import { ImageService } from '../../data/services/image.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ImageActions, VideoActions } from '../actions/assets.actions';

@Injectable()
export class ImageEffects {
  private actions$ = inject(Actions);
  private imageService = inject(ImageService);

  loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.loadImages),
      mergeMap(() =>
        this.imageService.getImages().pipe(
          map(images => {
            const results = images.map((img: IImage) => {
              return img;
            });
            return ImageActions.loadImagesSuccess({ images: results });
          }),
          catchError((error) => of(ImageActions.loadImagesFailure({ error })))
        )
      )
    )
  );

  loadImageDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.loadImageDetails),
      mergeMap((action: { imageId: string }) =>
        this.imageService.getImageDetails(action.imageId)
          .pipe(
            map(image => {
              return ImageActions.loadImageDetailsSuccess({ image });
            }),
            catchError((error) => of(ImageActions.loadImageDetailsFailure({ error })))
          )
      )
    )
  );

  updateImageSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.updateImageSize),
      mergeMap((action) =>
        this.imageService.updateImageSize(action.image).pipe(
          map(image =>  ImageActions.updateImageSizeSuccess({ image })),
          catchError((error) =>
            of(ImageActions.updateImageSizeFailure({ error }))))
      )
    )
  );
}
