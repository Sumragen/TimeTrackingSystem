import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';

import { StorageService } from './shared/services/storage/storage.service';
import { STORE_STATE } from './shared/store/store';
import { ActivityActions, ActivityActionsKey, ActivityState } from './shared/store/reducers/activity.reducer';

@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html',
   styleUrls: ['app.component.scss']
})
export class AppComponent {
   constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private storageService: StorageService,
      private store: Store<STORE_STATE>
   ) {
      this.initializeApp();
   }

   private initializeApp() {
      this.setupInitialStoreState();
      this.setupNativeUI();
   }

   private setupInitialStoreState(): void {
      this.storageService.getSavedState().then((state: ActivityState) => {
         if (!!state) {
            this.store.dispatch({
               type: ActivityActionsKey.INITIALIZE,
               payload: state
            })
         }
      })
   }

   private setupNativeUI(): void {
      this.platform.ready().then(() => {
         this.statusBar.styleDefault();
         this.splashScreen.hide();
      });
   }
}
