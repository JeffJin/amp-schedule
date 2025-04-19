import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { IVideo } from '../../data/models/dtos';
import { VideoService } from '../../data/services/video.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { VideoActions } from '../actions/assets.actions';

@Injectable()
export class VideoEffects {
  private actions$ = inject(Actions);
  private videoService = inject(VideoService);

  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.loadVideos),
      mergeMap(() => this.videoService.getVideos()
        .pipe(
          map(videos => {
            const results = videos.map((v: IVideo) => {
              return v;
            });
            return VideoActions.loadVideosSuccess({ videos: results });
          }),
          catchError((error) => of(VideoActions.loadVideosFailure({ error })))
        )
      )
    )
  );

  loadVideoDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.loadVideoDetails),
      mergeMap((action: { videoId: string }) =>
        this.videoService.getVideoDetails(action.videoId)
        .pipe(
          map(video => {
            return VideoActions.loadVideoDetailsSuccess({ video });
          }),
          catchError((error) => of(VideoActions.loadVideoDetailsFailure({ error })))
        )
      )
    )
  );
}
