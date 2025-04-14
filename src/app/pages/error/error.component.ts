import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShowPipe } from '../../shared/pipes/show-filter.pipe';

@Component({
  selector: 'app-error',
  imports: [
    NgForOf,
    ShowPipe
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {
  errors: {visible: boolean, message: string}[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.errors.push({visible: true, message: 'It should contain at least one uppercase letter.'})
    this.errors.push({visible: true, message: 'It should contain at least one lowercase letter.'})
    this.errors.push({visible: true, message: 'It should contain at least one number.'})
    this.errors.push({visible: true, message: 'It should contain at least one special character (e.g.,!, #).'})
  }

  addError() {
    const visible = Math.random() > 0.5;
    this.errors.push({ visible, message: `new error occurred at ${new Date().toLocaleTimeString()}`});
    this.errors = this.errors.slice();
    console.log('after adding error', this.errors);
  }

  removeError() {
    this.errors.pop();
    this.errors = this.errors.slice();
    console.log('after removing error', this.errors);
  }
}


