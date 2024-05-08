import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MustMatch } from './mustMatch.validator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../models/User';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environment';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf,HttpClientModule],
  providers: [Validators],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
    private _http:HttpClient
  ){}

  submitRegisterUser(){
    console.log("Submitted form: ", this.registerForm.value);
    console.log("Valid: ", this.registerForm.valid);
    if(!this.registerForm.invalid){
      const password = this.registerForm.value.password;
      const secretKey = 'secret_key'
      this.registerForm.value.password = CryptoJS.AES.encrypt(password, secretKey).toString();
      this._http.post(`${environment.apiBaseUrl}/database/register`, this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          // Puedes hacer algo con la respuesta, como redireccionar o mostrar un mensaje de éxito
        },
        error: (error) => {
          console.error('Error adding user', error);
          // Maneja el error, como mostrar un mensaje de error
        }
      });
    } else {
      this.registerForm.markAllAsTouched(); // Asegura que todos los campos están marcados como tocados
    }
    
  }

  isInvalid(fieldName:string){
    const field = this.registerForm.get(fieldName);

    return field?.invalid && field?.dirty && field?.touched;
  }
}
