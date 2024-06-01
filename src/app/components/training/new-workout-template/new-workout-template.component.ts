import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectExercisesForTemplate } from '../../../store/exercisesForTemplate/exercisesForTemplate.selector';
import { Exercise } from '../../../store/exercisesForTemplate/Exercise';
import { ErrorModalComponent } from '../../modal/error/error.component';
import { removeExercise, resetWorkoutTemplate, updateExerciseSeries } from '../../../store/exercisesForTemplate/exercisesForTemplate.action';
import { DatabaseService } from '../../../services/database/database.service';

@Component({
  selector: 'app-new-template',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, HttpClientModule, AsyncPipe, ErrorModalComponent, RouterLink],
  providers:[DatabaseService],
  templateUrl: './new-workout-template.component.html',
  styleUrls: ['./new-workout-template.component.css']
})
export class NewTemplateComponent implements OnInit {
  templateForm: FormGroup;
  exercisesFromStore$: Observable<Exercise[]> = of([]);
  isSynchronized: boolean = false; // Flag to control synchronization

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _databaseService:DatabaseService,
    private _router:Router
  ) {
    console.log("\nCREATING NEW WORKOUT TEMPLATE COMPONENT\n")
    this.templateForm = this._formBuilder.group({
      name: ['', Validators.required],
      exercises: this._formBuilder.array([])
    });

    
  }

  ngOnInit() {
    this.exercisesFromStore$ = this._store.select(selectExercisesForTemplate)
    console.log(this.exercisesFromStore$)
    this.exercisesFromStore$.subscribe(exercises=>{
      //if(!this.isSynchronized){
        this.resetForm()
        this.setExercisesFormArray(exercises);
        this.isSynchronized = true;
      //}
    })
  }

  setExercisesFormArray(exercises:Exercise[]){
    const exercisesFormArray = this.templateForm.get('exercises') as FormArray;
    exercises.forEach((exercise)=>{
      const exerciseGroup = this._formBuilder.group({
        name:[exercise.name,Validators.required],
        series:this._formBuilder.array(exercise.series.map(serie => this._formBuilder.group({
          repeticiones: [serie.repeticiones, Validators.required],
          kilos: [serie.kilos, Validators.required],
        })
      ))
      })
      exercisesFormArray.push(exerciseGroup)
    })
  }

  resetForm(): void {
    this.templateForm.reset();
    this.templateForm.setControl('exercises', this._formBuilder.array([]));
  }

  get exercises() {
    return this.templateForm.get('exercises') as FormArray;
  }


  removeSeries(exerciseIndex: number, seriesIndex: number) {
    this.getSeries(exerciseIndex).removeAt(seriesIndex);
    this.updateExerciseInStore(exerciseIndex);
  }


  getSeries(exerciseIndex: number) {
    return this.exercises.at(exerciseIndex).get('series') as FormArray;
  }

  addSeries(exerciseIndex: number) {
    const serieGroup = this._formBuilder.group({
      repeticiones: ['', Validators.required],
      kilos: ['', Validators.required]
    });
    this.getSeries(exerciseIndex).push(serieGroup);
    this.updateExerciseInStore(exerciseIndex);
  }

  removeExercise(exerciseIndex: number) {
    this.exercises.removeAt(exerciseIndex);
    this._store.dispatch(removeExercise({ index: exerciseIndex }));
  }

  updateExerciseInStore(exerciseIndex: number) {
    const exercise = this.exercises.at(exerciseIndex).value;
    this._store.dispatch(updateExerciseSeries({ index: exerciseIndex, series: exercise.series }));
  }

  onSubmit() {
    console.log(this.templateForm.value);
  }

  isInvalid(fieldName: string) {
    const field = this.templateForm.get(fieldName);
    return field?.invalid && field?.dirty && field?.touched;
  }

  saveTemplate(){
    console.log(this.templateForm)
    if(!this.templateForm.invalid){
    this._databaseService.saveTrainingTemplate(this.templateForm);
    this._databaseService.saveTrainingTemplate(this.templateForm).subscribe({
      next: (response) => {
        console.log('Template added successfully', response);
        this._router.navigate(['/training'])
        this._store.dispatch(resetWorkoutTemplate())
      },
      error: (error) => {
        console.log('Template not added successfully', error);
      }
    });
  }
  }

  clearTemplate(){
    this._store.dispatch(resetWorkoutTemplate())
  }
}
