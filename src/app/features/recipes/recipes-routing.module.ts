import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from 'src/app/core/guards/auth.guard';
import { RecipesResolverService } from 'src/app/core/services/recipes-resolver.service';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      {path: '', component: RecipeStartComponent },
      {path: 'new', component: RecipeEditComponent },
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      {path: ':id/edit', component: RecipeEditComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
