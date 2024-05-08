import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this._formBuilder.group({
    email:['', [Validators.required]],
    password:['', [Validators.required]]
  })
  constructor(
    private _formBuilder:FormBuilder,
    private _http:HttpClient
  ){}

  login() {
    if(!this.loginForm.invalid){
    const password = this.loginForm.value.password!;
    const secretKey = 'secret_key'
    this.loginForm.value.password = CryptoJS.AES.encrypt(password, secretKey).toString();
    this._http.post('/api/login', { email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe(
      (response: any) => {
        localStorage.setItem(`${environment.apiBaseUrl}/database/login`, response.token); // Guarda el token en localStorage
      },
      error => {
        console.error('Error during login', error);
      }
    );
  }
  }
}
