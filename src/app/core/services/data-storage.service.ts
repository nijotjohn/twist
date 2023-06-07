import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../../shared/models/recipe.model';

import { RecipeService } from './recipe.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  fireBaseUrl = 'https://twist-7ed5b-default-rtdb.firebaseio.com/';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      `${this.fireBaseUrl}recipes.json`, recipes
    ).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes(){
    return this.http
      .get<Recipe[]>(`${this.fireBaseUrl}recipes.json`)
      .pipe(
        map(recipes =>{
          return recipes.map(recipe =>{
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

}
