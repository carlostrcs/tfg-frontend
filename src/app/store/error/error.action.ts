import { createAction, props } from "@ngrx/store";

export const setError = createAction(
    '[Error] Set Error',
    props<{ errorMessage: string }>()
  );
  
  export const clearError = createAction('[Error] Clear Error');