import { Injectable } from '@angular/core';

import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'biryani',
  //     'Biryani is a mixed rice dish originating in South Asia. It is made with Indian spices, vegetables, rice, and usually some type of meat, or in some cases without any meat, and sometimes, in addition, eggs and potatoes.',
  //     'https://upload.wikimedia.org/wikipedia/commons/5/57/Chicken_Biriyani_%28_Malabar_-North_Kerala_style_%29.JPG',
  //     [
  //       new Ingredient('chicken', 1),
  //       new Ingredient('rice', 2),
  //       new Ingredient('egg', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'mandi',
  //     'Mandi is a traditional dish that originated from Hadhramaut, Yemen. consisting mainly of meat and rice with a special blend of spices, cooked in a pit underground.',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Chicken_Alfaham_with_Manthi_Rice_from_Kerala_IMG_20201204_204518.jpg/800px-Chicken_Alfaham_with_Manthi_Rice_from_Kerala_IMG_20201204_204518.jpg?20201209065721',
  //     [
  //       new Ingredient('chicken', 1),
  //       new Ingredient('rice', 2),
  //       new Ingredient('dried lemon', 2),
  //     ]
  //   ),
  // ];

  constructor(private shoppingService: ShoppingService){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.onRecipeChange();
  }

  onRecipeChange(){
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe{
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.onRecipeChange();
  }

  updateRecipe(index: number, updatedRecipe: Recipe){
    this.recipes[index] = updatedRecipe;
    this.onRecipeChange();
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.onRecipeChange();
  }
}
