import { createAction, props } from "@ngrx/store";
import { Meal } from "../../models/diet/Meal";
import { Food } from "../../models/diet/Food";

export const addMeal = createAction(
    '[Meal] Add Meal',
    props<{meal:Meal}>()
)

export const removeMeal = createAction(
    '[Meal] Remove Meal',
    props<{ index: number }>()
  );

export const updateMealFoods = createAction(
    '[Meal] Update Meal Foods',
    props<{ index: number, foods: Food[] }>()
 );

 export const resetMealFoods = createAction(
  '[Meal] Reset Meal Foods'
);