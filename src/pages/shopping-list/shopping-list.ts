import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list-service';
import { Ingredient } from '../../models/ingredient';




@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  /**Property list display list */
  listItems: Ingredient[];

  /**Make the service avaible in this component */
  constructor(private slService: ShoppingListService) { }

  /** getItems() from service will get a copy of the item*/
  ionViewWillEnter() {
    this.loadItems();
  }

  /**form you will recive  */
  /**Use the methdo from addItem which is found in service */
  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    /**This will display to the page itselft and get lastest version*/
    this.loadItems();
  }

  onRemoveItem(index: number) {
    this.slService.removeItem(index);
    /**Need to reload it here */
    this.loadItems();
  }

  /**Helper metho get the copy */
  private loadItems() {
    this.listItems = this.slService.getItems();
  }

}
