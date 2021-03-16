import { Component } from '@angular/core';
import {NotificationAnimationType, Options} from "angular2-notifications";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _toastNotificationsOptions: Options = {
    position: ['bottom', 'right'],
    timeOut: 1500,
    lastOnBottom: true,
    maxStack: 1,
    animate: NotificationAnimationType.FromRight,
    pauseOnHover: true,
    showProgressBar: true,
    clickToClose: true,
    clickIconToClose: true
  };

  get toastNotificationsOptions(): Options {
    return this._toastNotificationsOptions;
  }

}
