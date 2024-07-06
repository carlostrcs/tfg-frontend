import { KeyValuePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database/database.service';
import { RestTrack } from '../../models/sleep/RestTrack';
import { CamelCaseToWordsPipe } from '../../pipes/camel-case-to-words.pipe';

@Component({
  selector: 'app-sleep',
  standalone: true,
  imports: [NgIf,NgFor,TitleCasePipe,ReactiveFormsModule,CamelCaseToWordsPipe,KeyValuePipe],
  providers: [DatabaseService],
  templateUrl: './sleep.component.html',
  styleUrl: './sleep.component.css'
})
export class SleepComponent {
  restTrackForm: FormGroup;
  currentRestTrack: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _databaseService:DatabaseService
  ) {
    this.restTrackForm = this._formBuilder.group({
      hoursSlept: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
      timesWokeUp: ['', [Validators.required, Validators.min(0)]],
      subjectiveRecovery: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      chestFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      backFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      quadricepsFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      femoralFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      calfsFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      bicepsFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      tricepsFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      forearmsFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      shouldersFatigue: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      motivation: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  ngOnInit(): void {
    this.loadTodayRestTrack();
  }

  loadTodayRestTrack() {
    this._databaseService.getTodayRestTrack().subscribe(data => {
      if (data) {
        console.log("Sleep data:",data)
        this.currentRestTrack = data;
      }
    });
  }

  saveRestTrack() {
    if (this.restTrackForm.valid) {
      const restTrack: RestTrack = {
        ...this.restTrackForm.value,
        date: new Date().toISOString().split('T')[0] // Adding current date
      };

      this._databaseService.saveRestTrack(restTrack).subscribe(response => {
        console.log('RestTrack saved successfully', response);
        this.currentRestTrack = response;
      });
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
