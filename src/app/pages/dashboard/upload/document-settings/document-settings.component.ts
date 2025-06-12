import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IDocumentSettings } from '../../../../data/models/dtos';

@Component({
  selector: 'app-document-settings',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './document-settings.component.html',
  styleUrl: './document-settings.component.css'
})
export class DocumentSettingsComponent {
  @Input() settings: IDocumentSettings | null = {
  };
}
