import { Component, OnInit, Signal, signal } from '@angular/core';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../store/app.selectors';
import { signIn, SignInInput, signUp, SignUpInput } from 'aws-amplify/auth';
import { AuthService } from '../../data/services/auth.service';
import { AuthApiActions } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  imports: [
    AmplifyAuthenticatorModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isAuthenticated: Signal<boolean>;

  services: any;

  constructor(private store: Store, private authService: AuthService) {
    this.isAuthenticated = this.store.selectSignal(selectIsLoggedIn);
    this.services = {
      async handleSignIn(input: SignInInput) {
        let { username, password } = input;
        return authService.login(username, password!);
      },
    }
  }

  ngOnInit() {

  }
}
