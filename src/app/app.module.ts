import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './app.config';

import { ActiveService } from './services/active.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { StoreService } from './services/store.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    IonicStorageModule.forRoot({
      name: 'couplesup-db',
      driverOrder: ['localstorage','websql','indexeddb']
    })
  ],
  providers: [
    AppConfig,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ActiveService,
    CategoriesService,
    UsersService,
    StoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
