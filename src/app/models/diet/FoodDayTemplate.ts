import { Meal } from "./Meal";
import { NutritionalInfo } from "./NutritionalInfo";

export class FoodDayTemplate {
  public name:string = '';
  public meals: Meal[] = [];
  public nutritionalInfo: NutritionalInfo = new NutritionalInfo();

  addMeal(meal: Meal) {
    this.meals.push(meal);
    this.updateNutritionalInfoResume();
  }

  updateNutritionalInfoResume() {
    this.nutritionalInfo = new NutritionalInfo();

    for (const meal of this.meals) {
      for (const food of meal.foods) {
        const adjustedNutritionalInfo = new NutritionalInfo(
          food.nutritionalInfo.proteins * food.grams / 100,
          food.nutritionalInfo.fats * food.grams / 100,
          food.nutritionalInfo.carbs * food.grams / 100
        );

        this.nutritionalInfo.add(adjustedNutritionalInfo);
      }
    }
  }
}