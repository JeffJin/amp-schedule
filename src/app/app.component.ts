import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Hub } from 'aws-amplify/utils';
import { CONNECTION_STATE_CHANGE, ConnectionState } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ RouterOutlet, AmplifyAuthenticatorModule ]
})
export class AppComponent implements OnInit {
  title = 'Adworks Scheduling';

  constructor(public authenticator: AuthenticatorService) {
  }


  async ngOnInit(): Promise<void> {
    await this.currentAuthenticatedUser();
    Hub.listen('api', (data: any) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState as ConnectionState;
        console.log('connectionState', connectionState);
      }
    });

  }

  async currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log('currentAuthenticatedUser', username, userId, signInDetails);
    } catch (err) {
      console.log(err);
    }
  }


}
