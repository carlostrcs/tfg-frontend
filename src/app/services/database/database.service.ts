import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthRequest } from '../../models/AuthRequest';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { Exercise } from '../../store/exercisesForTemplate/Exercise';

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

}
