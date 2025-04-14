import { Component, EffectRef, inject, Injector, input, OnDestroy, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ImageActions } from '../../../../store/actions/assets.actions';
import { selectCurrentImage, selectCurrentVideo } from '../../../../store/app.selectors';
import { IImage, IVideo } from '../../../../data/models/dtos';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-image-info',
  imports: [
    RouterLink
  ],
  templateUrl: './image-info.component.html',
  styleUrl: './image-info.component.scss'
})
export class ImageInfoComponent implements OnInit, OnDestroy {
  imageId = input.required<string>();
  image$: Observable<IImage | null>;
  image: Signal<IImage | null>;
  loadImageEffectRef: EffectRef | undefined;

  constructor(private store: Store) {
    console.log('image infor component created');
    this.image = this.store.selectSignal(selectCurrentImage);
    this.image$ = this.store.select(selectCurrentImage);
    this.image$.subscribe(image => {
      if (image) {
        this.store.dispatch(ImageActions.updateImageSize({ image }));
      }
    })
  }

  ngOnInit() {
    // uses the injection context of Store, i.e. root injector
    this.loadImageEffectRef = this.store.dispatch(() => {
      console.log('dispatch load image details', this.imageId());
      return ImageActions.loadImageDetails({ imageId: this.imageId() });
    });
  }

  ngOnDestroy() {
    if (this.loadImageEffectRef) {
      // destroys the effect
      this.loadImageEffectRef.destroy();
    }
  }

}
