import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '@app/services/categories.service';

@Component({
	selector: 'app-categories',
	templateUrl: 'categories.page.html',
	styleUrls: ['categories.page.scss'],
})
export class CategoriesPage implements OnInit {

	constructor(
		private categoriesService: CategoriesService
	) {}

	public categories: Array<any> = [];
	private selected: Array<string> = [];

	public toggleSelection(cat: any) {
		if(this.isSelected(cat.id)) {
			this.selected = this.selected.filter(c => c !== cat.id);
		} else {
			this.selected.push(cat.id);
		}
		console.info(this.selected);
	}

	public isSelected(cat_id: string) {
		return this.selected.includes(cat_id);
	}

	ngOnInit() {
		this.categories = this.categoriesService.GetCategories();
		console.info("categories: ", this.categories);
	}

}
