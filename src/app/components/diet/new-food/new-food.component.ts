import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../../services/database/database.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-food',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  providers:[DatabaseService],
  templateUrl: './new-food.component.html',
  styleUrl: './new-food.component.css'
})
export class NewFoodComponent {
  foodForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService,
    private router: Router
  ) {
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
      grams: [0, [Validators.required, Validators.min(0)]],
      nutritionalInfo: this.fb.group({
        proteins: ['', [Validators.required, Validators.min(0)]],
        fats: ['', [Validators.required, Validators.min(0)]],
        carbs: ['', [Validators.required, Validators.min(0)]],
        calories: ['', [Validators.required, Validators.min(0)]],
      })
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.foodForm.valid) {
      const newFood = this.foodForm.value;

      this.databaseService.saveFood(newFood).subscribe({
        next: (response) => {
          console.log('Food added successfully', response);
          this.router.navigate(['/diet']);
        },
        error: (error) => {
          console.error('Error adding food', error);
        }
      });
    }
  }

  isInvalid(fieldName: string) {
    const field = this.foodForm.get(fieldName);
    return field?.invalid && field?.dirty && field?.touched;
  }
}
