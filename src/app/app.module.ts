import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './app.config';

import { PushService } from './services/push.service';
import { LogService } from './services/log.service';

const firebaseConfig = {
    apiKey: "AIzaSyDgCd6I3FXemBZAw6LbvR_WxYxmlIqJ68M",
    authDomain: "ambev-app-demo.firebaseapp.com",
    databaseURL: "https://ambev-app-demo.firebaseio.com",
    projectId: "ambev-app-demo",
    storageBucket: "",
    messagingSenderId: "221861118054",
    appId: "1:221861118054:web:8cf277dacb80a449"
  };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    AppConfig,
    StatusBar,
    SplashScreen,
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PushService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
