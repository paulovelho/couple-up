import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActiveService } from '@app/services/active.service';
import { CategoriesService } from '@app/services/categories.service';
import { UsersService } from '@app/services/users.service';

@Component({
	selector: 'app-user',
	templateUrl: 'user.page.html',
	styleUrls: ['user.page.scss'],
})
export class UserPage implements OnInit {

	constructor(
		private route: Router,
		private active: ActiveService,
		private users: UsersService,
	) {}

	public name: string = "";
	public passcode: string = "";


	public register() {
		let user = {
			name: this.name,
			pass: this.users.encryptPassword(this.passcode)
		};
		console.info("registering ", user);
		this.active.setUser(user)
			.then(() => {
				this.route.navigate(['/list']);
			});
	}


	ngOnInit() {
	}

}
