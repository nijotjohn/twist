import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm: NgForm;

  startedEditSub: Subscription;
  editMode = false;
  ingredientIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService){}

  ngOnInit(){
    this.startedEditSub = this.shoppingService.startedEditing.subscribe(
      (index: number) =>{
        this.editMode = true;
        this.ingredientIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    let newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.ingredientIndex, newIngredient);
    }else{
      this.shoppingService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.ingredientIndex);
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.startedEditSub.unsubscribe();
  }

}
