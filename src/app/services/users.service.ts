import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { StoreService } from './store.service';

declare var require: any;

@Injectable()
export class UsersService {

	constructor(
		private store: StoreService
	) {}

	private async addUser(user) {
		let userList = await this.store.get("users");
		if(!userList) {
			userList = [];
		}
		user.categories = [];
		userList.push(user);
		this.store.set("users", userList);
	}
	private async updateUser(user) {
		let userList = await this.store.get("users");
		userList.map((u) => {
			if( u.id != user.id ) return;
			u.name = user.name;
			u.categories = user.categories;
		});
		this.store.set("users", userList);
	}

	public async saveUser(user) {
		console.info("saving ", user);
		if(!user.id) {
			user.id = await this.store.getIncrement("user");
			return this.addUser(user);
		} else {
			return this.updateUser(user);
		}
	}
	public async removeUser(user) {
		let userList = await this.store.get("users");
		userList = userList.filter(u => u.id != user.id);
		return this.store.set("users", userList);
	}

	public async GetUsers(): Promise<Array<any>> {
		let u = await this.store.get("users");
		if (!u) u = [];
		return u;
	}

	public encryptPassword(pass: string) {
		var sha1 = require('sha1');
		let code = sha1(pass);
		return code;
	}

}
