import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectErrorState = (state:AppState)=>state.error;

export const selectError = createSelector(selectErrorState,
    state=>state
);

