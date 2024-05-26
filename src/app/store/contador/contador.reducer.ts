import { createReducer, on } from "@ngrx/store";
import { ContadorState } from "./contador.state";
import { setContador } from "./contador.action";

export const initialErrorState: ContadorState = {
    count:0
}

export const contadorReducer = createReducer(
    initialErrorState,
    on(setContador, (state) => ({
      ...state,
      count:state.count + 1
    }))
  );