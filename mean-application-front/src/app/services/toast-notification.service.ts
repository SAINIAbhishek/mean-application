import { Injectable } from '@angular/core';
import { Notification, NotificationsService } from 'angular2-notifications';

@Injectable({ providedIn: 'root' })
export class ToastNotificationService {

  constructor(private _notificationsService: NotificationsService) {}

  public error(message: string, title?: string): Notification {
    const _title = title ? title : 'Oups...';
    return this._notificationsService.error(_title, message ? message : '');
  }

  public success(message: string, title?: string): Notification {
    const _title = title ? title : 'Success...';
    return this._notificationsService.success(_title, message ? message : '');
  }

}
