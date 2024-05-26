import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectExercisesForTemplate } from '../../../store/exercisesForTemplate/exercisesForTemplate.selector';
import { Exercise } from '../../../store/exercisesForTemplate/Exercise';
import { ErrorModalComponent } from '../../modal/error/error.component';
import { removeExercise, updateExerciseSeries } from '../../../store/exercisesForTemplate/exercisesForTemplate.action';
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
  exercisesFromStore$: Observable<Exercise[]>;
  isSynchronized: boolean = false; // Flag to control synchronization

  constructor(
    private fb: FormBuilder,
    private _store: Store<AppState>,
    private _databaseService:DatabaseService,
    private _router:Router
  ) {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      exercises: this.fb.array([])
    });

    this.exercisesFromStore$ = this._store.select(selectExercisesForTemplate);
  }

  ngOnInit() {
    this.exercisesFromStore$.subscribe(exercises => {
      console.log('Exercises from store',exercises)
      // exercises.forEach(exercise => this.addExerciseFromStore(exercise));
      if (!this.isSynchronized) {
        this.syncExercisesWithStore(exercises);
        this.isSynchronized = true;
      }
    });
  }

  get exercises() {
    return this.templateForm.get('exercises') as FormArray;
  }

  addExercise() {
    const exerciseGroup = this.fb.group({
      name: ['', Validators.required],
      series: this.fb.array([])
    });
    //this.exercises.push(exerciseGroup);
  }

  removeSeries(exerciseIndex: number, seriesIndex: number) {
    this.getSeries(exerciseIndex).removeAt(seriesIndex);
    this.updateExerciseInStore(exerciseIndex);
  }

  addExerciseFromStore(exercise: Exercise) {
    const seriesArray = this.fb.array(
      exercise.series.map(serie => this.fb.group({
        repeticiones: [serie.repeticiones, Validators.required],
        kilos: [serie.kilos, Validators.required]
      }))
    );

    const exerciseGroup = this.fb.group({
      name: [exercise.name, Validators.required],
      series: seriesArray
    });
    console.log('Ejercicios addExerciseFromStore',this.exercises)
    this.exercises.push(exerciseGroup);
  }

  syncExercisesWithStore(exercises: Exercise[]) {
    exercises.forEach(exercise => this.addExerciseFromStore(exercise));
  }

  getSeries(exerciseIndex: number) {
    return this.exercises.at(exerciseIndex).get('series') as FormArray;
  }

  addSeries(exerciseIndex: number) {
    const serieGroup = this.fb.group({
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
      },
      error: (error) => {
        console.log('Template not added successfully', error);
      }
    });
  }
  }
}
