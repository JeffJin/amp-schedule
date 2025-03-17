import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ RouterOutlet, AmplifyAuthenticatorModule, JsonPipe ]
})
export class AppComponent {
  title = 'Adworks Scheduling';

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }
}
