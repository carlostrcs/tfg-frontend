import { createAction, props } from "@ngrx/store";
import { Exercise } from "./Exercise";
import { Serie } from "./Serie";

export const addExercise = createAction(
    '[Exercise] Add Exercise',
    props<{exercise:Exercise}>()
)

export const removeExercise = createAction(
    '[Exercise] Remove Exercise',
    props<{ index: number }>()
  );

export const updateExerciseSeries = createAction(
    '[Exercises] Update Exercise Series',
    props<{ index: number, series: Serie[] }>()
 );

export const resetWorkoutTemplate = createAction(
  '[Exercises] Reset Workout Template'
)

export const updateTemplateName = createAction(
  '[Exercises] Update Template Name',
  props<{ name: string}>()
);