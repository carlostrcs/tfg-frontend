import { Food } from "./Food";

export class Meal {
    public foods: Food[] = [];
  
    constructor(public name: string) {}
  
    // addFood(food: Food) {
    //   this.foods.push(food);
    // }
  }