import { NgClass } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { IVideo, VideoType } from '../../data/models/dtos';

@Component({
  selector: 'app-video',
  imports: [
    NgClass
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
  host: {
    'role': 'presentation',
    '(dblclick)': 'toggleFullscreen()',
  },
})
export class VideoComponent {
  protected readonly VideoType = VideoType;
  protected isFullScreen = signal(false);

  video = input.required<IVideo>();
  updateStatus = output<VideoStatus>();

  constructor() {

  }

  close() {
    this.updateStatus.emit(VideoStatus.Closed);
  }

  toggleFullscreen() {
    console.log('toggleFullscreen');
    this.isFullScreen.update((val: boolean) => !val);
  }
}

export enum VideoStatus {
  Playing = 'playing',
  Stopped = 'stopped',
  Paused = 'paused',
  Resumed = 'resumed',
  Closed = 'closed'
}

function trimString(value: string | undefined): string {
  return value?.trim() ?? '';
}
