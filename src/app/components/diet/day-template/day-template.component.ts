import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorModalComponent } from '../../modal/error/error.component';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { Meal } from '../../../models/diet/Meal';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { selectMealsForTemplate } from '../../../store/mealsForTemplate/mealsForTemplate.selector';
import { removeMeal, resetMealFoodsTemplate } from '../../../store/mealsForTemplate/mealsForTemplate.action';
import { DatabaseService } from '../../../services/database/database.service';
import { NutritionalInfo } from '../../../models/diet/NutritionalInfo';

@Component({
  selector: 'app-day-template',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, HttpClientModule, AsyncPipe, ErrorModalComponent, RouterLink],
  providers:[DatabaseService],
  templateUrl: './day-template.component.html',
  styleUrl: './day-template.component.css'
})
export class DayTemplateComponent implements OnInit {
  templateForm: FormGroup;
  meals$: Observable<Meal[]> = of([]);
  isSynchronized: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _router: Router,
    private _databaseService:DatabaseService
  ) {
  console.log("Constructor")
    this.templateForm = this._formBuilder.group({
      name: ['', Validators.required],
      meals: this._formBuilder.array([])
    });
  }

  ngOnInit(): void {
    console.log("ONINIT")
    // Load meals from the store on init
    this.meals$ = this._store.select(selectMealsForTemplate);
    console.log(this.meals$)
    this.meals$.subscribe(meals => {
      console.log(meals)
      // if(!this.isSynchronized){
        this.resetForm()
        this.setMealsFormArray(meals);
        this.isSynchronized=true
      //}
    });
  }

  setMealsFormArray(meals: Meal[]): void {
    console.log("SETMEALSFORMARRAY")
    const mealFormArray = this.templateForm.get('meals') as FormArray;
    meals.forEach(meal => {
      const mealGroup = this._formBuilder.group({
        name: [meal.name, Validators.required],
        foods: this._formBuilder.array(meal.foods.map(food => this._formBuilder.group({
          name: [food.name, Validators.required],
          grams: [food.grams, Validators.required],
          nutritionalInfo: this._formBuilder.group({
            proteins: [food.nutritionalInfo.proteins, Validators.required],
            fats: [food.nutritionalInfo.fats, Validators.required],
            carbs: [food.nutritionalInfo.carbs, Validators.required],
            calories:[food.nutritionalInfo.calories, Validators.required]
          })
        }))),
        nutritionalInfo: this.getNutritionalInfoFromMeal(meal)
      });
      console.log(mealGroup)
      mealFormArray.push(mealGroup);
    });
  }

  resetForm(): void {
    this.templateForm.reset();
    this.templateForm.setControl('meals', this._formBuilder.array([]));
  }

  get mealsFormArray(): FormArray {
    return this.templateForm.get('meals') as FormArray;
  }

  addMeal(): void {
    this._router.navigate(['/selectMealsForTemplate']);
  }

  submitTemplate(): void {
    // Logic to submit the template
    this._databaseService.saveFoodDayTemplate(this.templateForm).subscribe({
      next:(response)=>{
        console.log("Food Day Template saved successfully")
        this._store.dispatch(resetMealFoodsTemplate())
        this._router.navigate(['/diet']);
      },
      error:(error)=>{}
    })
    
  }

  isInvalid(fieldName: string) {
    const field = this.templateForm.get(fieldName);
    return field?.invalid && field?.dirty && field?.touched;
  }

  removeMeal(mealIndex: number) {
    this.mealsFormArray.removeAt(mealIndex);
    this._store.dispatch(removeMeal({ index: mealIndex }));
  }

  clearTemplate(){
    
    this._store.dispatch(resetMealFoodsTemplate())
  }

  getNutritionalInfoFromMeal(meal:Meal){
    let nutritionalInfo:NutritionalInfo = new NutritionalInfo()
    meal.foods.forEach((food)=>{
      nutritionalInfo.add(food.nutritionalInfo)
    })
    return nutritionalInfo;
  }
  
}
