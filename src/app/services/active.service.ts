import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class ActiveService {

	private user;

	constructor(
		private store:Storage
	) {}

	public getUsers() {
		if(!this.user) return false;
		return this.user.userName;
	}

	public getActiveUser() {
		if(this.user) {
			return this.user;
		}
	}
	public getActiveUserName() {
		return this.getActiveUser().name;
	}

	public async setUser(user) {
		this.user = user;
		let userList = await this.store.get("users");
		if(!userList) {
			userList = [];
		}
		userList.push(user);
		this.store.set("users", userList);
	}

	public saveCategories(cats) {
		this.store.set("test", "cats");
		this.store.set("categories", cats);
	}
	public getActiveCategories() {
		return this.store.get("categories");
	}

}
