import { Ingredient } from "../models/ingredient"

export class ShoppingListService {
    /**An empty array at the begining */
    /**Ingredient class load form model */
    private  ingredients: Ingredient[] = [];

    /**get the ingredient with add item method*/
    /**This method allow us to add a single item */
    addItem(name: string, amount: number){
        /**go to ingredient array above and push item to array */
        /** new Ingredient() is form the constructor ts form model*/
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    /**Getting the finish list of ingredient */
    /**Ex6 spread operator the 3 dots */
    /** which mean deconstruct the array into
     * indivudual elements so that we have a list 
     * of element then we can use push to push 
     * the existing elemnt to an array
     */
    addItems(items: Ingredient[]){
        this.ingredients.push(...items);
    }


    /**get a copy of the array */
    /**slice this will create a copy of the array  */
    getItems(){
        return this.ingredients.slice();
    }


    /**Remve item method which allow
     * to pass index of the item i want to delete
     * and pass splice elemt which will remove one element
     */
    removeItem(index:number) {
        this.ingredients.splice(index, 1);
    }

}