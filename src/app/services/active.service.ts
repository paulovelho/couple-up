import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { UsersService } from './users.service';
import { StoreService } from './store.service';

@Injectable()
export class ActiveService {

	private user = null;

	constructor(
		private users: UsersService,
		private store: StoreService,
	) {}

	public getActiveUser() {
		return this.user;
	}

	public async setUser(user) {
		this.user = user;
		await this.users.saveUser(user);
	}

	public async saveActive(user) {
		this.user = null;
		return this.users.saveUser(user);
	}

	public saveCategories(cats) {
		this.store.set("test", "cats");
		this.store.set("categories", cats);
	}
	public getActiveCategories() {
		return this.store.get("categories");
	}

}
