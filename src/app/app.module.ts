import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouteReuseStrategy} from "@angular/router";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {StoreModule} from "@ngrx/store";
import {buttonReducer} from "./shared/store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {StorageEffects} from "./shared/effects/storage.effects";
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {Device} from "@ionic-native/device/ngx";
import {TimeService} from "./shared/time/time.service";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        SharedModule,
        StoreModule.forRoot({button: buttonReducer}),
        EffectsModule.forRoot([StorageEffects])
    ],
    providers: [
        StatusBar,
        SplashScreen,
        NativeStorage,
        Device,
        TimeService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
