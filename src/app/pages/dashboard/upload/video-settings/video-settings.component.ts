import { Component, Input } from '@angular/core';
import { IVideoSettings } from '../../../../data/models/dtos';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-video-settings',
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './video-settings.component.html',
  styleUrl: './video-settings.component.css'
})
export class VideoSettingsComponent {
  @Input() settings: IVideoSettings = {
    duration: 0,
    videoSetting: 'Movie',
    youtubeUrl: '',
    tags: []
  };
}
