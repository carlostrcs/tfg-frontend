
import { ContadorState } from "./contador/contador.state";
import { ErrorState } from "./error/error.state";
import { ExercisesForTemplateState } from "./exercisesForTemplate/exercisesForTemplate.state";


export interface AppState{
    error:ErrorState
    exercisesSelectedForTemplate:ExercisesForTemplateState
    contador:ContadorState
}