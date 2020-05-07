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

	public async clear() {
		this.store.clear();
		let alert = await this.alerter.create({
			header: 'Privacidade',
			message: 'Dados apagados com sucesso.',
			buttons: [{
				text: 'Boa!',
				cssClass: 'secondary',
				handler: () => {
					this.route.navigate(['/home']);
				}
			}]
		});
		await alert.present();
	}

	ionViewWillEnter() {
	}

}
