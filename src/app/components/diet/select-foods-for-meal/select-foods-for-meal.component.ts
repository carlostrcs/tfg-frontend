import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Food } from '../../../models/diet/Food';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { DatabaseService } from '../../../services/database/database.service';
import { Router } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { addFood } from '../../../store/foodsForMeal/foodsForMeal.action';

@Component({
  selector: 'app-select-foods-for-meal',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor,AsyncPipe],
  providers:[DatabaseService],
  templateUrl: './select-foods-for-meal.component.html',
  styleUrl: './select-foods-for-meal.component.css'
})
export class SelectFoodsForMealComponent {

  foods$:Observable<Food[]> = of([])
  foodsSelectedForm: FormGroup;

  constructor(
    private _store:Store<AppState>,
    private _databaseService:DatabaseService,
    private _formBuilder:FormBuilder,
    private _router:Router
  ){
    this.foodsSelectedForm = this._formBuilder.group({
      foodsSelected: this._formBuilder.array([])
    });
  }

  ngOnInit(): void {
    console.log("ON INIT SELECT MEALS FOR TEMPLATE")
    this.foods$ = this._databaseService.getFoods()
    this.foods$.subscribe(foods => {
      console.log(foods)
      this.setFoodsFormArray(foods);
    });
  }

  get foodsFormArray() {
    return this.foodsSelectedForm.get('foodsSelected') as FormArray;
  }

  setFoodsFormArray(foods: Food[]): void {
    const foodFormArray = this.foodsSelectedForm.get('foodsSelected') as FormArray;
    foods.forEach(() => foodFormArray.push(this._formBuilder.control(false)));
  }

  addSelectedFoods(): void {
    const selectedFoodIndices:number[] = this.foodsSelectedForm.value.foodsSelected
      .map((selected: boolean, i: number) => selected ? i : null)
      .filter((index: number | null) => index !== null);

    this.foods$.subscribe(foods => {
      const foodsToAdd = selectedFoodIndices.map(index => foods[index]);
      foodsToAdd.forEach((food)=>{this._store.dispatch(addFood({ food: food }));})
      this._router.navigate(['/newMeal']); // Redirige al componente de crear template
    });
  }
}
