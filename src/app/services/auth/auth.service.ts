import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environment";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private authStatus = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private _http:HttpClient) {}
  
    private hasToken(): boolean {
      return !!localStorage.getItem('authToken');
    }
  
    get isLoggedIn() {
      return this.authStatus.asObservable();
    }
  
    login(token: string): void {
      localStorage.setItem('authToken', token);
      this.authStatus.next(true);
    }
  
    logout(): void {
      localStorage.removeItem('authToken');
      this.authStatus.next(false);
    }

    deleteAccount(): void {
        localStorage.removeItem('authToken');
        this.authStatus.next(false);
    }

    isValidToken():boolean{
      this._http.get(`${environment.apiBaseUrl}/token/isValidToken`).subscribe({
        next: (response) => {
          console.log('User has a valid token', response);
          return true;
        },
        error: (error) => {
          console.error('User has not a valid token', error);
          return false;
        }
      });
      return false;
    }
  }