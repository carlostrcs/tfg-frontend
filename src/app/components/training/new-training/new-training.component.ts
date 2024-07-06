import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorModalComponent } from '../../modal/error/error.component';
import { Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../../../services/database/database.service';
import { Exercise } from '../../../store/exercisesForTemplate/Exercise';
import { Observable, of } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { selectExercisesForTemplate } from '../../../store/exercisesForTemplate/exercisesForTemplate.selector';
import { removeExercise, resetWorkoutTemplate, updateExerciseSeries } from '../../../store/exercisesForTemplate/exercisesForTemplate.action';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, HttpClientModule, AsyncPipe, ErrorModalComponent, RouterLink],
  providers:[DatabaseService],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent {
  workoutForm: FormGroup;
  exercisesFromStore$: Observable<Exercise[]> = of([]);
  isSynchronized: boolean = false; // Flag to control synchronization

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _databaseService:DatabaseService,
    private _router:Router
  ) {
    console.log("\nCREATING NEW WORKOUT Workout COMPONENT\n")
    this.workoutForm = this._formBuilder.group({
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
    const exercisesFormArray = this.workoutForm.get('exercises') as FormArray;
    exercises.forEach((exercise)=>{
      const exerciseGroup = this._formBuilder.group({
        name:[exercise.name,Validators.required],
        series:this._formBuilder.array(exercise.series.map(serie => this._formBuilder.group({
          repeticiones: [serie.repeticiones, Validators.required],
          kilos: [serie.kilos, Validators.required],
          })
        )),
        details:[exercise.details]
      })
      exercisesFormArray.push(exerciseGroup)
    })
  }

  resetForm(): void {
    this.workoutForm.reset();
    this.workoutForm.setControl('exercises', this._formBuilder.array([]));
  }

  get exercises() {
    return this.workoutForm.get('exercises') as FormArray;
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
    console.log(this.workoutForm.value);
  }

  isInvalid(fieldName: string) {
    const field = this.workoutForm.get(fieldName);
    return field?.invalid && field?.dirty && field?.touched;
  }

  saveWorkout(){
    console.log(this.workoutForm)
    if(!this.workoutForm.invalid){
    this._databaseService.saveTrainingWorkout(this.workoutForm);
    this._databaseService.saveTrainingWorkout(this.workoutForm).subscribe({
      next: (response) => {
        console.log('Workout added successfully', response);
        this._router.navigate(['/training'])
        this._store.dispatch(resetWorkoutTemplate())
      },
      error: (error) => {
        console.log('Workout not added successfully', error);
      }
    });
  }
  }

  clearWorkout(){
    this._store.dispatch(resetWorkoutTemplate())
  }
}
