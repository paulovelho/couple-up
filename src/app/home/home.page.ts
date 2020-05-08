import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ActiveService } from '@app/services/active.service';
import { StoreService } from '@app/services/store.service';
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
		private store: StoreService,
		private UsersService: UsersService,
	) {}

	public users: Array<any> = [];
	public selected: any = [];
	public result: Array<any> = [];
	public comparingMembers: string;

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

	public async userEdit() {
		let user = this.selected[0];
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

	public async userDelete() {
		let user = this.selected[0];
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

	public clickPerson() {
		this.result = [];
		this.comparingMembers = "";
		this.selected = this.users.filter(u => u.selected);
	}

	public compare() {
		this.comparingMembers = this.selected.map(p => p.name).join(" e ");

		let intersection = [];
		let examined = 0;
		this.selected.map((person) => {
			examined ++;
			if( examined == 1 ) {
				intersection = person.categories;
				return;
			}
			intersection = this.intersect(intersection, person.categories);
		});
		this.result = intersection;

	}

	private intersect(arr1, arr2) {
		return arr1.filter(element => arr2.includes(element));
	}

	private async privacyMessage() {
		let privacy = await this.store.get("privacy-displayed");
		if(privacy) return;
		let alert = await this.alerter.create({
			header: 'Privacidade',
			message: 'Este aplicativo não manda nenhuma informação para servidores. Todos os dados ficam armazenados no próprio celular.<br/>',
			buttons: [{
				text: 'Que bom!',
				cssClass: 'secondary',
				handler: () => {
					this.store.set('privacy-displayed', true);
					console.info("saving");
				}
			}]
		});
		await alert.present();
	}

	ionViewWillEnter() {
		this.privacyMessage();
		this.loadUsers();
	}

}
