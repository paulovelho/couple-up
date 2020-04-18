import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable()
export class ActiveService {

	private user;

	constructor(
	) {}

	public getUser() {
		if(!this.user) return false;
		return this.user.userName;
	}

	public setUser(userName) {
		this.user = {};
		this.user.name = userName;
	}

}
