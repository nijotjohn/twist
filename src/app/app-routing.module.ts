import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/shopping', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () => import('./features/recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping',
    loadChildren: () => import('./features/shopping/shopping.module').then(m => m.ShoppingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
