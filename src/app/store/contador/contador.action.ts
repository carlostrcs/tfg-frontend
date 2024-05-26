import { createAction, props } from "@ngrx/store";

export const setContador = createAction(
    '[Contador] Set Contador'
  );
  
  export const clearContador = createAction('[Contador] Clear Contador');