import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Firebase } from '@ionic-native/firebase/ngx';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class PushService {

	private version: string = "1.0";

	constructor(
    private firebase: Firebase,
		private afs: AngularFirestore,
		private platform: Platform,
	) {}

	public async pushAuth(email: string, type: string) {
		let token = await this.getToken();
		this.saveToken(token, email, type);
	}

	async getToken() {
		let token;
		if (this.platform.is('android')) {
			token = await this.firebase.getToken();
		}

		if (this.platform.is('ios')) {
			token = await this.firebase.getToken();
			await this.firebase.grantPermission();
		}
		return token;
	}

	private saveToken(token, email: string, type: string) {
		if (!token) return;

		const devicesRef = this.afs.collection('devices');

		const data = {
			token,
			time: new Date().toISOString(),
			userId: email,
			type: type,
			version: this.version,
		};

		console.info("sending to firebase", data);

		return devicesRef.doc(token).set(data).then((resp) => { });
	}

	onNotifications() {
//		return this.firebase.onNotificationOpen();
	}
}
