import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectExercisesForTemplateState = (state: AppState) => state.exercisesSelectedForTemplate;

export const selectExercisesForTemplate = createSelector(selectExercisesForTemplateState,
    state=>state.exercises_list
)

export const selectNameForTemplate = createSelector(selectExercisesForTemplateState,
    state=>state.templateName
)