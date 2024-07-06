import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectFoodsForMealState = (state: AppState) => state.foodsSelectedForMeal;

export const selectFoodsForMeal = createSelector(selectFoodsForMealState,
    state=>state.foods_list
)