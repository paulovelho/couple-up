import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import categories from '../../data/categories.json';

@Injectable()
export class CategoriesService {

	constructor(
	) {}

	public GetCategories(): Array<any> {
		return categories;
	}

}
