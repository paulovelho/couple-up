import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class StoreService {

	constructor(
		private store:Storage
	) {}

	public async getIncrement(key) {
		let aikey = "autoincrement_"+key;
		let n = await this.store.get(aikey);
		if(!n) n = 0;
		n++;
		await this.store.set(aikey, n);
		return n;
	}

	public clear() {
		this.store.clear();
	}

	public get(key: string) {
		return this.store.get(key);
	}

	public set(key: string, data: any) {
		return this.store.set(key, data);
	}

}
