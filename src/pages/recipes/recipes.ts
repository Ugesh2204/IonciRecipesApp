import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";



@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  /**Add this NavController  */
  constructor(private navCtrl: NavController) {

  }

  /**We want to navigate to the edit recipe page */
  /**Passing a javacsript property {mode: 'New'} 
   * because i am going to use the same page the edit-recipe page
   * for both editing and creating recipes
   * 
  */
  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
}
