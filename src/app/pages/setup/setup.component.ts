import { Component, OnInit, ViewChild } from '@angular/core';
import { AwsService } from '../../data/services/aws.service';
import { MatIcon } from '@angular/material/icon';
import { uploadData } from "aws-amplify/storage";
import { MatMiniFabButton } from '@angular/material/button';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import { remove } from 'aws-amplify/storage';
import { list } from 'aws-amplify/storage';
import { GetUrlWithPathOutput } from '@aws-amplify/storage/src/providers/s3/types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-setup',
  imports: [
    MatIcon,
    MatMiniFabButton,
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;

  deleteTagId: string = '';
  username: string = '';
  signInDetails: any;
  userId: string = '';
  fileName = '';
  assets: any[] = [];
  constructor(private awsService: AwsService) {

  }

  async ngOnInit() {
    await this.currentAuthenticatedUser();
    await this.loadImages();
  }

  async loadImages() {
    const { items } = await list({
      // path: 'media/',
      path: ({identityId}) => `images/${identityId}/`
    });
    console.log(`total ${items.length} images are loaded`);

    for (const item of items) {
      const href = await this.getLink(item.path);
      this.assets.push({
        href,
        path: item.path,
        eTag: item.eTag
      });
    }
    console.log(this.assets);
  }

  async getLink(path: string) {
    const { url: { href } } = await getUrl({ path });
    console.log(href);
    return href;
  }

  async currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      this.username = username;
      this.userId = userId;
      this.signInDetails = signInDetails;
      console.log(username, userId, signInDetails);
    } catch (err) {
      console.log(err);
    }
  }

  async uploadFile(file: File): Promise<void> {
    if (file && file.size > 0) {
      this.fileName = file.name;
      try {
        const result = await uploadData({
          data: file,
          path:  ({ identityId }) => {
            return `images/${identityId}/${file.name}`;
          },
          // path: `media/${file.name}`,
          options: {
            onProgress: ({ transferredBytes, totalBytes }) => {
              if (totalBytes) {
                console.log(
                  `Upload progress ${Math.round(
                    (transferredBytes / totalBytes) * 100
                  )} %`
                );
              }
            },
          }
        }).result;
        console.log("Complete file read successfully!", result);
      } catch(err) {
        console.error(err);
      }
    }
  }

  async onFileSelected(event: any) {
    for (const file of event.target.files) {
      await this.uploadFile(file);
    }
  }

  setupTags() {
    this.awsService.awsClient.models.Tag.create({
      name: 'Fishing'
    });
    this.awsService.awsClient.models.Tag.create({
      name: 'Reefing'
    });
    this.awsService.awsClient.models.Tag.create({
      name: 'Badminton'
    });
    this.awsService.awsClient.models.Tag.create({
      name: 'Soccer'
    });
  }

  cleanUpTags(): void {
    // this.awsService.awsClient.graphql({
    //   mutation: deleteToDo,
    //   variables: {
    //     id: ''
    //   }
    // });
  }

  setupImages() {

  }

  setupVideos() {

  }

  deleteTag(deleteTagId: string) {
    this.awsService.awsClient.models.Tag.delete({
      id: deleteTagId
    });
  }

  openFileDialog() {
    this.fileUpload?.nativeElement.click();
  }

  async deleteAsset(url: string) {
    try {
      await remove({
        path: url
        // bucket: {
        //   bucketName: 'amplify-amplifyangulartem-adworksawsfilesbucketa54-u4zqejximvgb',
        //   region: 'us-east-2'
        // }
      });
    } catch (error) {
      console.log('Error ', error);
    }
  }
}
