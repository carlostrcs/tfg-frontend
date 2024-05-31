import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environment';
import { AuthRequest } from '../../models/AuthRequest';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorModalComponent } from '../modal/error/error.component';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ErrorModalComponent],
  providers:[DatabaseService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('errorModal')
  private errorModal!:ErrorModalComponent;

  loginForm = this._formBuilder.group({
    email:['', [Validators.required]],
    password:['', [Validators.required]]
  })
  constructor(
    private _formBuilder:FormBuilder,
    private _router:Router,
    private _authService:AuthService,
    private _databaseService:DatabaseService
  ){}

  login() {
    if(!this.loginForm.invalid){
      this._databaseService.login(this.loginForm).subscribe({
        next: (response: any) => {
          sessionStorage.setItem('authToken', response.token); // Guarda el token en sessionStorage
          this._authService.login(response.token);
          this._router.navigate(['/home'])
        },
        error: (error) => {
          //console.error('Error during login', error);
          this.errorModal.openModal();
        }
      });
  }
  }
}
