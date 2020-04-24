import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActiveService } from '@app/services/active.service';
import { CategoriesService } from '@app/services/categories.service';

@Component({
	selector: 'app-categories',
	templateUrl: 'categories.page.html',
	styleUrls: ['categories.page.scss'],
})
export class CategoriesPage {

	constructor(
		private route: Router,
		private active: ActiveService,
		private categoriesService: CategoriesService,
	) {}

	public user: any;
	public username: string;

	public categories: Array<any> = [];
	private selected: Array<string> = [];

	public toggleSelection(cat: any) {
		if(this.isSelected(cat.id)) {
			this.selected = this.selected.filter(c => c !== cat.id);
		} else {
			this.selected.push(cat.id);
		}
		this.active.saveCategories(this.selected);
		console.info(this.selected);
	}

	public isSelected(cat_id: string) {
		return this.selected.includes(cat_id);
	}

	public save() {
		this.user.categories = this.selected;
		this.selected = [];
		this.active.saveActive(this.user)
			.then(() => {
				this.route.navigate(['/home']);
			})
			.catch(err => console.error(err));
	}

	async ionViewWillEnter() {
		this.user = await this.active.getActiveUser();
		if( !this.user) {
			this.route.navigate(['/home']);
			return;
		}
		this.username = this.user.name;
		this.selected = this.user.categories;
		this.categories = this.categoriesService.GetCategories();
	}

}
