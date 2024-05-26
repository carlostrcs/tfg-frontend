import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectContadorState = (state:AppState)=>state.contador;

export const selectContador = createSelector(selectContadorState,
    state=>state.count
);
