import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class LogService {

	constructor(
		private firebase: Firebase,
		private afs: AngularFirestore,
		private platform: Platform
	) {}

	private logEnabled: boolean = true;
	private currentDocument;
	private data: any;

	private leftpad(val, resultLength = 2, leftpadChar = '0'): string {
		return (String(leftpadChar).repeat(resultLength) + String(val)).slice(String(val).length);
	}

	private getDate(): string {
		let date = new Date();
		return date.getFullYear()
			+ this.leftpad(date.getMonth() + 1, 2)
			+ this.leftpad(date.getDate(), 2)
			+ this.leftpad(date.getHours(), 2)
			+ this.leftpad(date.getMinutes(), 2)
			+ this.leftpad(date.getSeconds(), 2);
	}

	public createSession(type: string, user: string) {
		console.info("creating " + type + " log for " + user);
		if(!this.logEnabled) return;
		let time = this.getDate();
		let docName = time + "_" + user;
		let collection = this.afs.collection('logging');
		this.data = {
			user: user,
			type: type,
			time: time,
			log: [],
		};


		this.currentDocument = collection.doc(docName);
		console.info("saving " + docName, this.data);
		return this.currentDocument.set(this.data).then((resp) => {
			console.info("log service push response: ", resp);
		})
		.catch((err) => { console.error(err); });
	}

	public newPage(page: any) {
		if(!this.logEnabled) return;
		page["time"] = this.getDate();
		this.data.log.push(page);
		if(!this.currentDocument) return;
		console.info("adding page ", page);
		return this.currentDocument.update(this.data)
	}

}
