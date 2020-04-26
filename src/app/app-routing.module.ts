import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'user', loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)},
  { path: 'list', loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)},
  { path: 'about', loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
