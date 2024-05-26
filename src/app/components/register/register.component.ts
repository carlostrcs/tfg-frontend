import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MustMatch } from './mustMatch.validator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../models/User';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorState } from '../../store/error/error.state';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectError } from '../../store/error/error.selector';
import { ModalComponent } from '../modal/message/modal.component';
import { ErrorModalComponent } from '../modal/error/error.component';
import { DatabaseService } from '../../services/database/database.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf,HttpClientModule,AsyncPipe,ErrorModalComponent],
  providers: [Validators,DatabaseService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('errorModal')
  private errorModal!:ErrorModalComponent;

  registerForm = this._formBuilder.group({
    name:['', [Validators.required,Validators.minLength(5)]],
    surname:['', [Validators.required]],
    phoneNumber:['', [Validators.pattern(/^\d{9}$/)]],
    email:['', [Validators.required,Validators.email]],
    confirmationEmail:['', [Validators.required,Validators.email]],
    password:['', [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]],
    confirmationPassword:['', [Validators.required]]
  },{
    validator: [MustMatch('password', 'confirmationPassword'),MustMatch('email', 'confirmationEmail')]
  })
  
  constructor(
    private _formBuilder:FormBuilder,
    private _http:HttpClient,
    private _router:Router,
    private _store:Store<AppState>,
    private _databaseService:DatabaseService
  ){

  }

  submitRegisterUser(){
    console.log("Submitted form: ", this.registerForm.value);
    console.log("Valid: ", this.registerForm.valid);
    if(!this.registerForm.invalid){
      this._databaseService.register(this.registerForm).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          this._router.navigate(['/login'])
        },
        error: (error) => {
          this.errorModal.openModal();
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
    
  }

  isInvalid(fieldName:string){
    const field = this.registerForm.get(fieldName);

    return field?.invalid && field?.dirty && field?.touched;
  }
}
