import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ActiveService } from '@app/services/active.service';
import { UsersService } from '@app/services/users.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	constructor(
		private route: Router,
		private alerter: AlertController,
		private active: ActiveService,
		private UsersService: UsersService,
	) {}

	public users: Array<string> = [];

	public async message(message: string) {
		const alert = await this.alerter.create({
			header: 'Editar Lista',
			message: message,
			buttons: [{
				text: 'OK',
				role: 'cancel',
				cssClass: 'secondary',
			}]
		});
		await alert.present();
	}

	public async userEdit(user) {
		const alert = await this.alerter.create({
			header: 'Editar Lista',
			inputs: [{
				name: 'pass',
				type: 'password',
				placeholder: 'digite a senha de acesso de ' + user.name
			}],
			buttons: [{
				text: 'Cancelar',
				role: 'cancel',
				cssClass: 'secondary',
			}, {
				text: 'Vai',
				handler: (data) => {
					console.info(data);
					let hash = this.UsersService.encryptPassword(data.pass);
					console.info("hash: ", hash);
					console.info("user", user);
					if(hash != user.pass) {
						this.message("senha incorreta!");
						return;
					}
					this.active.setUser(user)
						.then(() => {
							this.route.navigate(['/list']);
						});
				},
				cssClass: 'primary',
			}]
		});
		await alert.present();
	}

	public async userDelete(user) {
		let alert = await this.alerter.create({
			header: 'Apagar?',
			message: 'Apagar usuário ' + user.name + ' ?',
			buttons: [{
				text: 'Não!',
				role: 'cancel',
				cssClass: 'secondary',
			}, {
				text: 'Okay',
				handler: () => {
					this.UsersService.removeUser(user)
						.then(() => this.loadUsers());
				},
				cssClass: 'primary',
			}]
		});
		await alert.present();
	}

	private loadUsers() {
		this.UsersService.GetUsers()
			.then(u => this.users = u);
	}

	ionViewWillEnter() {
		this.loadUsers();
	}

}
