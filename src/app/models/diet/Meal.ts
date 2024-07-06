import { Food } from "./Food";
import { NutritionalInfo } from "./NutritionalInfo";

export class Meal {
    public foods: Food[] = [];
    
    constructor(public name: string, public nutritionalInfo: NutritionalInfo) {}
  
    // addFood(food: Food) {
    //   this.foods.push(food);
    // }
  }