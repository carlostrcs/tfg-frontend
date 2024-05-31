import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { DatabaseService } from '../../../services/database/database.service';
import { Observable, of } from 'rxjs';
import { Meal } from '../../../models/diet/Meal';
import { addMeal } from '../../../store/mealsForTemplate/mealsForTemplate.action';

@Component({
  selector: 'app-select-meals-for-template',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,AsyncPipe,RouterLink,NgIf],
  providers:[DatabaseService],
  templateUrl: './select-meals-for-template.component.html',
  styleUrl: './select-meals-for-template.component.css'
})
export class SelectMealsForTemplateComponent implements OnInit {

  meals$:Observable<Meal[]> = of([])
  mealsSelectedForm: FormGroup;

  constructor(
    private _store:Store<AppState>,
    private _databaseService:DatabaseService,
    private _formBuilder:FormBuilder,
    private _router:Router
  ){
    this.mealsSelectedForm = this._formBuilder.group({
      mealsSelected: this._formBuilder.array([])
    });
  }

  ngOnInit(): void {
    console.log("ON INIT SELECT MEALS FOR TEMPLATE")
    this.meals$ = this._databaseService.getMeals()
    this.meals$.subscribe(meals => {
      console.log(meals)
      this.setMealsFormArray(meals);
    });
  }

  get mealsFormArray() {
    return this.mealsSelectedForm.get('mealsSelected') as FormArray;
  }

  setMealsFormArray(meals: Meal[]): void {
    const mealFormArray = this.mealsSelectedForm.get('mealsSelected') as FormArray;
    meals.forEach(() => mealFormArray.push(this._formBuilder.control(false)));
  }

  addSelectedMeals(): void {
    const selectedMealIndices:number[] = this.mealsSelectedForm.value.mealsSelected
      .map((selected: boolean, i: number) => selected ? i : null)
      .filter((index: number | null) => index !== null);

    this.meals$.subscribe(meals => {
      const mealsToAdd = selectedMealIndices.map(index => meals[index]);
      mealsToAdd.forEach((meal)=>{this._store.dispatch(addMeal({ meal: meal }));})
      this._router.navigate(['/dietDayTemplate']); // Redirige al componente de crear template
    });
  }

}
