import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheet, ActionSheetController, AlertController, ToastController,NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from "../../services/recipe-service";



@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  /**store mode in a property  new 
   * so that we will alway start a new recipe mode
  */
  mode = 'New';

  /**Implementing the dropdown electOptions property for form see form*/
  selectOptions = ['Easy', 'Medium', 'Hard'];


recipeForm: FormGroup;



 /**Retring the data we are passing */
 constructor (private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipesService,
              private navCtrl: NavController){}

 ngOnInit() {
   /*Assign the mode to nav parama and get the
   mode property */
   /**Accessing the mode from Recopes.ts when pushing the 
    * stack of page 
    */
   this.mode = this.navParams.get('mode');
   //let call initializeform her to actually create 
   //a form
   this.initializeForm();
 }

 onSubmit() {
   const value = this.recipeForm.value;
   let ingredients = [];
   if(value.ingredients.length > 0) {
     /**Javascript map */
     /**This will turn an array of string into
      * array of object
       */
    ingredients = value.ingredients.map(name => {
      return {name: name, amount: 1}; 
    });
   }
   /**Extract value  */
   this.recipesService.addRecipe(value.title, value.description, value.difficulty,value.ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
 }

/**Hook up the Manage iNgredient form html */
/**It like an alert add the alert controler */
 onManageIngredients(){
  const actionSheet = this.actionSheetController.create({
    title: 'What do you want to do ?',
    buttons: [
      {
        text: 'Add Ingredient',
        handler: () => {
            this.createNewIngredientAlert().present();
        }
      },
      {
        text: 'Remove all Ingredients',
        role: 'destructive',
        handler: () => {
          /**get array an access my recipe ingredient */
          const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
          /**Looping throug the array and remove all ingredient */
          const len = fArray.length;
          if (len > 0) {
            for (let i = len - 1; i>=0; i--){
              fArray.removeAt(i);
            }
            const toast = this.toastCtrl.create({
              message: 'All Ingredients were deleted!',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      },
      {
        text: 'Cancel',
        role: 'Cancel'
      }
    ]
  });
  actionSheet.present();
 }

 /**Create the alert */
private createNewIngredientAlert() {
  return this.alertCtrl.create({
    title: 'Add Ingredient',
    inputs: [
      {
        name: 'name',
        placeholder: 'Name'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: data => {
          /**if is empty or null */
           /**trim cathes white spaces */
          if (data.name.trim() == '' || data.name == null){
            const toast = this.toastCtrl.create({
              message: 'Please enter a valid value!',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
            return;
          }
          /**Add a new form control */
          /**Tell typescript this is a form array */
          (<FormArray>this.recipeForm.get('ingredients'))
          .push(new FormControl(data.name, Validators.required));

          const toast = this.toastCtrl.create({
            message: 'Item added!',
            duration: 1000,
            position: 'bottom'
          });
          toast.present();
        }
      }
    ]
  });
}




/**Creating the Reactive form */
 private initializeForm(){
  /**Assignint the recipeForm from above */
  /**We need to pass an object Angular 2 need thiss */
  this.recipeForm = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'description': new FormControl(null, Validators.required),
    'difficulty': new FormControl('Medium', Validators.required),
    /** Add controller Ingredients bcoz it will stor an array of ingredient */
    /**Form array simple hold n array of control */
    'ingredients': new FormArray([])
  });
 }

}
