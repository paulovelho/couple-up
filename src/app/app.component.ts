import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      console.info("back button subscribe");

    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });
  }

/*
  registerDevice() {
    this.push.register()
      .then((token) => {
        console.info("registering token: ", token);
        return this.push.saveToken(token);
      })
      .then((token) => {
        console.info("token saved: ", token);
      });
  }
*/
}
