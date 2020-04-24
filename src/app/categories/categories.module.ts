import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CategoriesList } from './categories.list';
import { CategoriesPage } from './categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoriesPage
      }
    ])
  ],
  declarations: [
    CategoriesList,
    CategoriesPage,
  ]
})
export class CategoriesPageModule {}
