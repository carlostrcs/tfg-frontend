import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { addExercise } from '../../../store/exercisesForTemplate/exercisesForTemplate.action';
import { selectExercisesForTemplate } from '../../../store/exercisesForTemplate/exercisesForTemplate.selector';
import { Observable, of } from 'rxjs';
import { Exercise } from '../../../store/exercisesForTemplate/Exercise';
import { Data, Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../../../services/database/database.service';

@Component({
  selector: 'app-select-exercises-for-template',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,AsyncPipe,RouterLink],
  providers:[DatabaseService],
  templateUrl: './select-exercises-for-template.component.html',
  styleUrl: './select-exercises-for-template.component.css'
})
export class SelectExercisesForTemplateComponent implements OnInit {
  form: FormGroup;
  exercises$: Observable<Exercise[]> = of([]);

  constructor(
    private _fb: FormBuilder,
    private _databaseService: DatabaseService,
    private _store: Store<AppState>,
    private _router:Router
  ) {
    this.form = this._fb.group({
      ejercicios: this._fb.array([])
    });
  }

  ngOnInit() {
    this.exercises$ = this._databaseService.getExercises();
    this.exercises$.subscribe(exercises => {
      console.log('Exercises from service',exercises);
      this.form.setControl('ejercicios', this._fb.array(exercises.map(() => this._fb.control(false))));
    });
  }

  get ejerciciosArray() {
    return this.form.get('ejercicios') as FormArray;
  }

  anadirEjercicios() {
    const selectedExerciseIndices = this.form.value.ejercicios
      .map((checked: boolean, i: number) => checked ? i : null)
      .filter((index: number | null) => index !== null);

    this.exercises$.subscribe(exercises => {
      selectedExerciseIndices.forEach((index: number) => {
        const exercise = exercises[index];
        if (exercise) {
          console.log('Adding exercise:', exercise);
          this._store.dispatch(addExercise({ exercise }));
        }
      });
      this._router.navigate(['/newTemplate'])
    });
    
  }
}
