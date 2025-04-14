import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { IImage } from '../../../data/models/dtos';
import { ImageActions } from '../../../store/actions/assets.actions';
import { selectImages } from '../../../store/app.selectors';
import { ImageInfoComponent } from './image-info/image-info.component';

@Component({
  selector: 'app-images',
  imports: [
    ImageInfoComponent
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent implements OnInit {
  readonly images: Signal<IImage[] | undefined>;
  readonly images$;
  selectedId: string = '';

  constructor(private store: Store) {
    this.images$ = this.store.select<IImage[]>(selectImages);
    this.images = toSignal(this.images$);
  }

  ngOnInit() {
    this.store.dispatch(ImageActions.loadImages());
  }


  selectImage(id: string) {
    this.selectedId = id;
  }
}
