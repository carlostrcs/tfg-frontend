import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectMealsForTemplateState = (state: AppState) => state.mealsSelectedForTemplate;

export const selectMealsForTemplate = createSelector(selectMealsForTemplateState,
    state=>state.meals_list
)