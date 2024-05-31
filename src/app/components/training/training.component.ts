import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environment';
import { RouterLink } from '@angular/router';
import { NewTemplateComponent } from './new-workout-template/new-workout-template.component';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { Observable, of } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [RouterLink,NewTemplateComponent,NewExerciseComponent,NewTrainingComponent,NgIf,NgFor,AsyncPipe],
  providers:[DatabaseService],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {
  templates:any[] = [];

  constructor(
    private http: HttpClient,
    private _databaseService:DatabaseService
  ) {
    console.log("\nCREATING TRAINING COMPONENT\n")
  }

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    this._databaseService.getTrainingTemplates().subscribe({
      next:(response:any)=>{
        console.log("List of templates successfully ", response)
        this.templates = response
      },
      error:(error)=>{
        console.log("List of templates error: ", error)
      }
    })
  }
}
