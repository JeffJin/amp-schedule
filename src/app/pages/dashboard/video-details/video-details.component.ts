import { Component, Input, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideo } from '../../../data/models/dtos';
import { Store } from '@ngrx/store';
import { selectCurrentVideo } from '../../../store/app.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { VideoComponent, VideoStatus } from '../../../components/video/video.component';
import { VideoActions } from '../../../store/actions/assets.actions';

@Component({
  selector: 'app-video-details',
  imports: [
    VideoComponent,
    JsonPipe
  ],
  templateUrl: './video-details.component.html',
  styleUrl: './video-details.component.scss'
})
export class VideoDetailsComponent {
  video: Signal<IVideo | null>;

  constructor(private store: Store) {
    this.video = this.store.selectSignal(selectCurrentVideo);
  }

  @Input()
  set videoId(id: string) {
    console.log('VideoDetailsComponent, videoId::', id);
    this.store.dispatch(VideoActions.loadVideoDetails({ videoId: id }))
  }

  updateVideoStatus($event: VideoStatus) {
    console.log('update video status', $event);
  }
}
