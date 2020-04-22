import { Component, OnInit } from '@angular/core';

import { UsersService } from '@app/services/users.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	constructor(
		private UsersService: UsersService,
	) {}

	public users: Array<string> = [];

	ngOnInit() {
		this.UsersService.GetUsers()
			.then(u => this.users = u);
	}

}
