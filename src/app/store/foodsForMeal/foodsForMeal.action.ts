import { createAction, props } from "@ngrx/store";
import { Food } from "../../models/diet/Food";

export const addFood = createAction(
    '[Food] Add food',
    props<{food:Food}>()
)

export const removeFood = createAction(
    '[Food] Remove Food',
    props<{ index: number }>()
  );

// export const updateFoods = createAction(
//     '[Food] Update Foods',
//     props<{ index: number, foods: Food[] }>()
//  );

 export const resetFoods = createAction(
  '[Food] Reset Foods'
);