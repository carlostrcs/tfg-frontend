import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../../../services/database/database.service';
import { NgFor, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Meal } from '../../../models/diet/Meal';
import { Food } from '../../../models/diet/Food';
import { selectFoodsForMeal } from '../../../store/foodsForMeal/foodsForMeal.selector';
import { removeFood, resetFoods } from '../../../store/foodsForMeal/foodsForMeal.action';
import { NutritionalInfo } from '../../../models/diet/NutritionalInfo';

@Component({
  selector: 'app-new-meal',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor,RouterLink],
  providers:[DatabaseService],
  templateUrl: './new-meal.component.html',
  styleUrl: './new-meal.component.css'
})
export class NewMealComponent implements OnInit {
  mealForm: FormGroup;
  foods$: Observable<Food[]> = of([]);
  isSynchronized: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _router: Router,
    private _databaseService: DatabaseService
  ) {
    this.mealForm = this._formBuilder.group({
      name: ['', Validators.required],
      foods: this._formBuilder.array([])
    });
  }

  ngOnInit(): void {
    console.log("RENDER")
    this.foods$ = this._store.select(selectFoodsForMeal);
    console.log(this.foods$)
    this.foods$.subscribe(foods => {
      console.log(foods)
      // if(!this.isSynchronized){
        this.resetForm()
        this.setFoodsFormArray(foods);
        this.isSynchronized=true
      //}
    });
    
  }

  setFoodsFormArray(foods: Food[]): void {
    console.log("SETFOODSFORMARRAY")
    const foodFormArray = this.mealForm.get('foods') as FormArray;
    foods.forEach(food => {
      const foodGroup = this._formBuilder.group({
          name: [food.name, Validators.required],
          grams: ['', Validators.required],
          nutritionalInfo: this._formBuilder.group({
            proteins: [food.nutritionalInfo.proteins, Validators.required],
            fats: [food.nutritionalInfo.fats, Validators.required],
            carbs: [food.nutritionalInfo.carbs, Validators.required],
            calories: [food.nutritionalInfo.calories, Validators.required]
          })
        })
        foodFormArray.push(foodGroup);
      });
  }

  resetForm(): void {
    this.mealForm.reset();
    this.mealForm.setControl('foods', this._formBuilder.array([]));
  }

  get foodsFormArray(): FormArray {
    return this.mealForm.get('foods') as FormArray;
  }

  removeFood(index: number): void {
    this.foodsFormArray.removeAt(index);
    this._store.dispatch(removeFood({ index: index }));
  }

  saveMeal(): void {
    if (this.mealForm.valid) {
      this._databaseService.saveMeal(this.mealForm).subscribe({
        next: (response) => {
          console.log('Meal added successfully', response);
          this.clearMeal()
          this._router.navigate(['/diet']);
        },
        error: (error) => {
          console.error('Error adding meal', error);
        }
      });
    }
  }

  isInvalid(fieldName: string) {
    const field = this.mealForm.get(fieldName);
    return field?.invalid && (field?.dirty || field?.touched);
  }

  clearMeal() {
    this._store.dispatch(resetFoods())
  }

  
  getNutritionalInfoFromMeal(): NutritionalInfo {
    const nutritionalInfo = new NutritionalInfo();
    this.foodsFormArray.controls.forEach(foodGroup => {
      console.log(foodGroup)
      const grams = foodGroup.get('grams')?.value;
      const info = foodGroup.get('nutritionalInfo')?.value;
      nutritionalInfo.proteins += (info.proteins * grams) / 100;
      nutritionalInfo.fats += (info.fats * grams) / 100;
      nutritionalInfo.carbs += (info.carbs * grams) / 100;
      nutritionalInfo.calories += (info.calories * grams) / 100;
    });
    return nutritionalInfo;
  }
}
