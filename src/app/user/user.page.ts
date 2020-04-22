import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActiveService } from '@app/services/active.service';
import { CategoriesService } from '@app/services/categories.service';

declare var require: any;

@Component({
	selector: 'app-user',
	templateUrl: 'user.page.html',
	styleUrls: ['user.page.scss'],
})
export class UserPage implements OnInit {

	constructor(
		private route: Router,
		private active: ActiveService,
	) {}

	public name: string = "";
	public pass: string = "";


	public register() {
		var sha1 = require('sha1');
		let code = sha1(this.pass);
		let user = {
			name: this.name,
			pass: code,
		};
		this.active.setUser(user)
			.then(() => {
				this.route.navigate(['/list'])
			});
	}


	ngOnInit() {
	}

}
