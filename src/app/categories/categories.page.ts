import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '@app/services/categories.service';

@Component({
	selector: 'app-categories',
	templateUrl: 'categories.page.html',
	styleUrls: ['categories.page.scss'],
})
export class CategoriesPage implements OnInit {

	constructor(
		private categories: CategoriesService
	) {}

	ngOnInit() {
		let categories = this.categories.GetCategories();
		console.info("categories: ", categories);
	}

}
