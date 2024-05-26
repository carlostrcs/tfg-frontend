import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "../environment";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

export const AuthGuard = () => {
  const router = inject(Router);
  if(localStorage.getItem('authToken')){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
