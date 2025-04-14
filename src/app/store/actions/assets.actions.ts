import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAudio, IImage, IVideo } from '../../data/models/dtos';

export const VideoActions = createActionGroup({
  source: 'Videos',
  events: {
    'Load Videos':  emptyProps(),
    'Load Videos Success':  props<{ videos: IVideo[] }>(),
    'Load Videos Failure':  props<{ error: string }>(),
    'Add Video': props<{ video: IVideo }>(),
    'Load Video Details': props<{ videoId: string }>(),
    'Load Video Details Success':  props<{ video: IVideo }>(),
    'Load Video Details Failure':  props<{ error: string }>(),
    'Select Current Video': props<{ videoId: string }>(),
    'Remove Video': props<{ id: string }>(),
    'Update Video': props<{ video: IVideo }>(),
  }
});
export const ImageActions = createActionGroup({
  source: 'Images',
  events: {
    'Load Images':  emptyProps(),
    'Load Images Success':  props<{ images: IImage[] }>(),
    'Load Images Failure':  props<{ error: string }>(),
    'Load Image Details': props<{ imageId: string }>(),
    'Load Image Details Success':  props<{ image: IImage }>(),
    'Load Image Details Failure':  props<{ error: string }>(),
    'Select Current Image': props<{ imageId: string }>(),
    'Add Image': props<{ image: IImage }>(),
    'Add Image Success':  props<{ image: IImage }>(),
    'Remove Image': props<{ id: string }>(),
    'Remove Image Success':  props<{ id: string }>(),
    'Update Image': props<{ image: IImage }>(),
    'Update Image Success': props<{ image: IImage }>(),
    'Update Image Failure': props<{ error: string }>(),
    'Update Image Size': props<{ image: IImage }>(),
    'Update Image Size Success': props<{ image: IImage }>(),
    'Update Image Size Failure': props<{ error: string }>(),
  }
});
export const AudioActions = createActionGroup({
  source: 'Audios',
  events: {
    'Load Audios':  emptyProps(),
    'Load Audios Success':  props<{ audios: IAudio[] }>(),
    'Load Audios Failure':  props<{ error: string }>(),
    'Add Audio': props<{ audio: IAudio }>(),
    'Remove Audio': props<{ id: string }>(),
    'Update Audio': props<{ audio: IAudio }>(),
  }
});
