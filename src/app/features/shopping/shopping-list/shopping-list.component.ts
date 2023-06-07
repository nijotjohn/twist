import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[];
  private ingChangedSub: Subscription;

  constructor(private shoppingService: ShoppingService){}

  ngOnInit(){
    this.ingredients = this.shoppingService.getIngredients();
    this.ingChangedSub = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number){
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.ingChangedSub.unsubscribe();
  }



}
