import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthRequest } from '../../models/AuthRequest';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { Exercise } from '../../store/exercisesForTemplate/Exercise';
import { Meal } from '../../models/diet/Meal';
import { FoodDayTemplate } from '../../models/diet/FoodDayTemplate';
import { RestTrack } from '../../models/sleep/RestTrack';
import { Food } from '../../models/diet/Food';

@Injectable()
export class DatabaseService {

  constructor(
    private _http:HttpClient
  ) { }

  login(loginForm:FormGroup) {
    const password = loginForm.value.password!;
    var authRequest = new AuthRequest(loginForm.value.email!,password ) 
    return this._http.post(`${environment.apiBaseUrl}/auth/login`, authRequest);
  
  }

  register(registerForm:FormGroup){
    return this._http.post(`${environment.apiBaseUrl}/auth/register`, registerForm.value)
  }

  getTrainingTemplates(){
    return this._http.get(`${environment.apiBaseUrl}/training/getAllTrainingTemplates`)
  }

  getExercises(): Observable<Exercise[]> {
    return this._http.get<Exercise[]>(`${environment.apiBaseUrl}/training/getExercisesList`);
  }

  saveTrainingTemplate(trainingTemplate:FormGroup){
    console.log(trainingTemplate.value)
    return this._http.post(`${environment.apiBaseUrl}/training/saveTrainingTemplate`, trainingTemplate.value)
  }

  getDayFoodTemplates():Observable<FoodDayTemplate[]>{
    return this._http.get<FoodDayTemplate[]>(`${environment.apiBaseUrl}/diet/getAllFoodDayTemplates`)
  }

  getMeals():Observable<Meal[]>{
    return this._http.get<Meal[]>(`${environment.apiBaseUrl}/diet/getMealsList`)
  }

  saveFoodDayTemplate(foodDayTemplate:FormGroup){
    console.log(foodDayTemplate.value)
    return this._http.post(`${environment.apiBaseUrl}/diet/saveFoodDayTemplate`, foodDayTemplate.value)
  }

  saveFood(food : Food){
    return this._http.post<Food>(`${environment.apiBaseUrl}/diet/saveFood`, food);
  }

  deleteDietTemplate(foodDayTemplate:any){
    this._http.delete(`${environment.apiBaseUrl}/diet/deleteFoodDayTemplate/${foodDayTemplate.id}`).subscribe({
      next:(response)=>{console.log("Success deleting ",response)},
      error:(error)=>{console.log("Error deleting ",error)}
    })
  }

  deleteTrainingTemplate(trainingTemplate:any){
    this._http.delete(`${environment.apiBaseUrl}/training/deleteTrainingTemplate/${trainingTemplate.id}`).subscribe({
      next:(response)=>{console.log("Success deleting ",response)},
      error:(error)=>{console.log("Error deleting ",error)}
    })
  }

  saveTrainingWorkout(trainingWorkout:FormGroup){
    console.log(trainingWorkout.value)
    return this._http.post(`${environment.apiBaseUrl}/training/saveTrainingWorkout`, trainingWorkout.value)
  }

  saveCustomExercise(customExercise:FormGroup){
    console.log(customExercise.value)
    return this._http.post(`${environment.apiBaseUrl}/training/saveCustomExercise`, customExercise.value)
  }
  
  getTodayRestTrack(){
    return this._http.get<RestTrack>(`${environment.apiBaseUrl}/sleep/getTodayRestTrack`)
  }

  saveRestTrack(restTrack : RestTrack){
    return this._http.post<RestTrack>(`${environment.apiBaseUrl}/sleep/saveRestTrack`, restTrack);
  }

  getFoods():Observable<Food[]>{
    return this._http.get<Food[]>(`${environment.apiBaseUrl}/diet/getFoodsList`)
  }

  saveMeal(meal : FormGroup){
    return this._http.post(`${environment.apiBaseUrl}/diet/saveMeal`, meal.value);
  }


  
}
