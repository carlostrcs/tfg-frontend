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
  selector: 'app-new-exercise',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, HttpClientModule, AsyncPipe, ErrorModalComponent, RouterLink],
  providers:[DatabaseService],
  templateUrl: './new-exercise.component.html',
  styleUrl: './new-exercise.component.css'
})
export class NewExerciseComponent {
  exerciseForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _databaseService:DatabaseService,
    private _router:Router
  ) {
    this.exerciseForm = this._formBuilder.group({
      name: ['', Validators.required],
      details: [''],
      series: this._formBuilder.array([])
    });
  }

  ngOnInit() {
    // Any initialization if needed
  }

  get series() {
    return this.exerciseForm.get('series') as FormArray;
  }

  addSeries() {
    const serieGroup = this._formBuilder.group({
      repeticiones: ['', Validators.required],
      kilos: ['', Validators.required]
    });
    this.series.push(serieGroup);
  }

  removeSeries(seriesIndex: number) {
    this.series.removeAt(seriesIndex);
  }

  onSubmit() {
    console.log(this.exerciseForm.value);
  }

  isInvalid(fieldName: string) {
    const field = this.exerciseForm.get(fieldName);
    return field?.invalid && field?.dirty && field?.touched;
  }

  saveExercise() {
    if(!this.exerciseForm.invalid){
      this._databaseService.saveCustomExercise(this.exerciseForm).subscribe({
        next: (response) => {
          console.log('Exercise added successfully', response);
          this._router.navigate(['/training'])
        },
        error: (error) => {
          console.log('Exercise not added successfully', error);
        }
      });
    }
  }

  clearForm() {
    this.exerciseForm.reset();
    this.series.clear();
  }
}
