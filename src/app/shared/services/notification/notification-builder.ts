import { ILocalNotification } from '@ionic-native/local-notifications';
import { IdService } from '../generator/id/id.service';

export class NotificationBuilder {
  public static create(opts: ILocalNotification): ILocalNotification {
    return {
      id: IdService.g(),
      ...opts
    };
  }
}
