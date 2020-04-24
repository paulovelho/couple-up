import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from '@app/services/categories.service';

@Component({
	selector: 'categories-list',
	templateUrl: 'categories.list.html',
	styleUrls: ['categories.list.scss'],
})
export class CategoriesList {

	constructor(
		private categoriesService: CategoriesService,
	) {}

	public catList: Array<any> = [];

	@Input()
	set categories(cats: Array<string>) {
		console.info("list ", cats);
		this.catList = this.loadCategories()
			.filter(cat => cats.includes(cat.id));
	}

	private loadCategories(): Array<any> {
		return this.categoriesService.GetCategories();
	}

	async ionViewWillEnter() {
	}

}
