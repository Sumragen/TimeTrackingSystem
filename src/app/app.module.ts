import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Device } from '@ionic-native/device/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TimeService } from './shared/services/time/time.service';
import { SharedModule } from './shared/shared.module';
import { StatisticResolver } from './modules/statistic/statistic.resolver';
import { reducers } from './shared/store/store';
import { StorageService } from './shared/services/storage/storage.service';
import { getMetaReducers } from './shared/store/meta/meta.reducers';

@NgModule({
   declarations: [AppComponent],
   entryComponents: [],
   imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      SharedModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([])
   ],
   providers: [
      StatusBar,
      SplashScreen,
      NativeStorage,
      Device,
      TimeService,
      StatisticResolver,
      {
         provide: META_REDUCERS,
         deps: [StorageService],
         useFactory: getMetaReducers,
         multi: true,
      },
      {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
