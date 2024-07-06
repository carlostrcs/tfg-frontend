import { HttpClient, HttpHeaders } from "@angular/common/http";
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
      return !!sessionStorage.getItem('authToken');
    }
  
    get isLoggedIn() {
      return this.authStatus.asObservable();
    }
  
    login(token: string): void {
      sessionStorage.setItem('authToken', token);
      this.authStatus.next(true);
    }
  
    logout(): void {
      sessionStorage.removeItem('authToken');
      this.authStatus.next(false);
    }

    deleteAccount(): void {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            this._http.delete(`${environment.apiBaseUrl}/auth/deleteAccount`, { headers }).subscribe({
                next: () => {
                    console.log("Account deleted successfully");
                    sessionStorage.removeItem('authToken');
                    this.authStatus.next(false);
                },
                error: (error) => {
                    console.error('Error deleting account', error);
                }
            });
        } else {
            console.error('No auth token found');
        }
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