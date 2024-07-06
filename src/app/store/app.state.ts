
import { ContadorState } from "./contador/contador.state";
import { ErrorState } from "./error/error.state";
import { ExercisesForTemplateState } from "./exercisesForTemplate/exercisesForTemplate.state";
import { FoodsForMealState } from "./foodsForMeal/foodsForMeal.state";

import { MealsForTemplateState } from "./mealsForTemplate/mealsForTemplate.state";


export interface AppState{
    error:ErrorState
    exercisesSelectedForTemplate:ExercisesForTemplateState
    mealsSelectedForTemplate:MealsForTemplateState
    foodsSelectedForMeal:FoodsForMealState
    contador:ContadorState
}