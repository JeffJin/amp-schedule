import { Component, OnInit } from '@angular/core';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    AmplifyAuthenticatorModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const isLoggedIn = this.authenticator.authStatus === 'authenticated';
  }
}
