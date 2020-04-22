import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsersService {

	constructor(
		private store:Storage
	) {}

	public GetUsers(): Promise<Array<any>> {
		return this.store.get("users");
	}

}
