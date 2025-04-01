import { Component, OnInit } from '@angular/core';
import { AwsService } from '../../data/services/aws.service';


@Component({
  selector: 'app-setup',
  imports: [],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent implements OnInit {
  deleteTagId: string = '8e855455-cffa-496f-973c-ba2664210417';
  constructor(private awsService: AwsService) {

  }

  ngOnInit(): void {
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
}
