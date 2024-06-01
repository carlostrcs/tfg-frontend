import { createReducer, on } from "@ngrx/store";
import { MealsForTemplateState } from "./mealsForTemplate.state";
import { addMeal, removeMeal,  resetMealFoodsTemplate, updateMealFoods } from "./mealsForTemplate.action";

export const initialMealsForTemplateState:MealsForTemplateState = {
    meals_list:[]
}

export const mealsForTemplateReducer = createReducer(
    initialMealsForTemplateState,
    on(addMeal, (state, { meal }) => ({
        ...state,
        meals_list: [...state.meals_list, meal]
    })),
    on(removeMeal, (state, { index }) => ({
        ...state,
        meals_list: state.meals_list.filter((_, i) => i !== index)
      })),
    on(updateMealFoods,(state,{index,foods})=>({
        ...state,meals_list: state.meals_list.map((meal, i) =>
            i === index ? { ...meal, foods } : meal
          )
    })),
    on(resetMealFoodsTemplate, () => initialMealsForTemplateState)
    
);