import { createReducer, on } from "@ngrx/store";
import { ExercisesForTemplateState } from "./exercisesForTemplate.state";
import { addExercise, removeExercise, resetWorkoutTemplate, updateExerciseSeries } from "./exercisesForTemplate.action";

export const initialExercisesForTemplateState:ExercisesForTemplateState = {
    templateName:'',
    exercises_list:[]
}

export const exercisesForTemplateReducer = createReducer(
    initialExercisesForTemplateState,
    on(addExercise, (state, { exercise }) => ({
        ...state,
        exercises_list: [...state.exercises_list, exercise]
    })),
    on(removeExercise, (state, { index }) => ({
        ...state,
        exercises_list: state.exercises_list.filter((_, i) => i !== index)
      })),
    on(updateExerciseSeries,(state,{index,series})=>({
        ...state,exercises_list: state.exercises_list.map((exercise, i) =>
            i === index ? { ...exercise, series } : exercise
          )
    })),
    on(resetWorkoutTemplate, () => initialExercisesForTemplateState)
    
);