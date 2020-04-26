import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { StoreService } from '@app/services/store.service';

@Component({
	selector: 'app-about',
	templateUrl: 'about.page.html',
	styleUrls: ['about.page.scss'],
})
export class AboutPage {

	constructor(
		private route: Router,
		private alerter: AlertController,
		private store: StoreService,
	) {}

	public clear(): void {
		this.store.clear();
	}

	ionViewWillEnter() {
	}

}
