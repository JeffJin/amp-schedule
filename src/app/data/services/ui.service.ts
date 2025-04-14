import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UiAction } from '../models/ui-action';

@Injectable()
export class UiService {
  private actionSource = new BehaviorSubject<UiAction|null>(null);
  currentAction = this.actionSource.asObservable();

  constructor() {
  }

  toggleSideMenu() {
    const action: UiAction = {target: 'LeftMenuComponent', action: 'toggle'};
    this.actionSource.next(action);
  }

  toggleNotification() {
    const action: UiAction = {target: 'NotificationCenter', action: 'toggle'};
    this.actionSource.next(action);
  }
}
