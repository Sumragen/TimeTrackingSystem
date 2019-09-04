import { Injectable } from '@angular/core';
import { ILocalNotification, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private localNotifications: LocalNotifications) {}

  public on(eventName: string): Observable<any> {
    return this.localNotifications.on(eventName);
  }

  public schedule(options: ILocalNotification) {
    this.localNotifications.schedule(options);
  }
}
