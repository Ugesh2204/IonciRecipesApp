import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { Recipe } from "../../models/recipe";
import { RecipesService } from '../../services/recipe-service';
import { RecipePage } from '../recipe/recipe';



@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  /**Add this NavController  */
  constructor(private navCtrl: NavController, private recipesService: RecipesService) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
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


  /**I want load the recipe page */
  /**Passing the data to the recipe page */
  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }




}
