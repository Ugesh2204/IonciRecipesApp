import { Ingredient } from "./ingredient";

export class Recipe {
    /**Check recipe html to create the blue blue print */
    constructor(
        public title: string,
        public description: string,
        public difficulty: string,
        public ingredients: Ingredient[]){}
    
}