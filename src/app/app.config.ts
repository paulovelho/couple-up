import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {

  constructor() {
  }

  getBaseUrl(): string {
//    return "https://ambevqa.service-now.com/";
    return "https://ambev.service-now.com/";
  }

  getServiceNowUrls(): any {
    let base = this.getBaseUrl();
    return {
      'external': base + "click?id=ambev_registration",
      'ambev': base + "navpage.do", 
    };
  }

  getUrlFor(type: string): string {
    return this.getServiceNowUrls()[type];
  }

}
