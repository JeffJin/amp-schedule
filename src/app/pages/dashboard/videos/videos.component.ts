import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { IVideo } from '../../../data/models/dtos';
import { VideoActions } from '../../../store/actions/assets.actions';
import { selectVideos } from '../../../store/app.selectors';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-videos',
  imports: [
    RouterLink
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent implements OnInit {
  readonly videos: Signal<IVideo[]>;

  constructor(private store: Store) {
    this.videos = this.store.selectSignal<IVideo[]>(selectVideos);
  }

  ngOnInit() {
    this.store.dispatch(VideoActions.loadVideos());
  }
}
