import { createReducer, on } from "@ngrx/store";
import { ErrorState } from "./error.state";
import { clearError, setError } from "./error.action";


export const initialErrorState: ErrorState = {
    hasError: false,
    errorMessage: null
}

export const errorReducer = createReducer(
    initialErrorState,
    on(setError, (state, { errorMessage }) => ({
      ...state,
      hasError: true,
      errorMessage
    })),
    on(clearError, (state) => ({
      ...state,
      hasError: false,
      errorMessage: null
    }))
  );