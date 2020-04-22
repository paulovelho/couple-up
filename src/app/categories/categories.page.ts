import { Component, OnInit } from '@angular/core';

import { ActiveService } from '@app/services/active.service';
import { CategoriesService } from '@app/services/categories.service';

@Component({
	selector: 'app-categories',
	templateUrl: 'categories.page.html',
	styleUrls: ['categories.page.scss'],
})
export class CategoriesPage implements OnInit {

	constructor(
		private active: ActiveService,
		private categoriesService: CategoriesService,
	) {}

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

	ngOnInit() {
		this.username = this.active.getActiveUserName();
		this.active.getActiveCategories()
			.then((cats) => {
				this.categories = this.categoriesService.GetCategories();
				this.selected = cats; 
			});
	}

}
