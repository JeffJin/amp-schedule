import { Component, OnInit } from '@angular/core';
import { getCurrentUser } from 'aws-amplify/auth';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    JsonPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  username: string = '';
  signInDetails: any;
  userId: string = '';

  constructor() {

  }

  async ngOnInit(): Promise<void> {
    await this.currentAuthenticatedUser();
  }

  async currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      this.username = username;
      this.userId = userId;
      this.signInDetails = signInDetails;
    } catch (err) {
      console.log(err);
    }
  }
}
