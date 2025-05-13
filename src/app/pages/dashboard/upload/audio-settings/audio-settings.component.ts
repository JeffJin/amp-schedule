import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAudioSettings } from '../../../../data/models/dtos';

@Component({
  selector: 'app-audio-settings',
  imports: [
    FormsModule
  ],
  templateUrl: './audio-settings.component.html',
  styleUrl: './audio-settings.component.css'
})
export class AudioSettingsComponent {
  @Input() settings: IAudioSettings = {
    duration: 0,
  };

}
