import { Component, Input, input } from '@angular/core';
import { IImageSettings, IVideoSettings } from '../../../../data/models/dtos';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-image-settings',
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './image-settings.component.html',
  styleUrl: './image-settings.component.css'
})
export class ImageSettingsComponent {
  @Input() settings: IImageSettings = {
    width: 0,
    height: 0,
  };

}
