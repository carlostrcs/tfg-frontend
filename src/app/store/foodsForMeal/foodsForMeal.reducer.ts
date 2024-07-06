import { createReducer, on } from "@ngrx/store";
import { FoodsForMealState } from "./foodsForMeal.state";
import { addFood, removeFood, resetFoods } from "./foodsForMeal.action";

export const initialFoodsForMealState:FoodsForMealState = {
    foods_list:[]
}

export const foodsForMealReducer = createReducer(
    initialFoodsForMealState,
    on(addFood, (state, { food }) => ({
        ...state,
        foods_list: [...state.foods_list, food]
    })),
    on(removeFood, (state, { index }) => ({
        ...state,
        foods_list: state.foods_list.filter((_, i) => i !== index)
      })),
    on(resetFoods, () => initialFoodsForMealState)
    
);