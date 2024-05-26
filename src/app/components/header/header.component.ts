import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../modal/message/modal.component';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
declare var bootstrap: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule,RouterModule,NgClass,ModalComponent,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @ViewChild('myModal1')
  private modal!:ModalComponent;
  isLoggedIn = false;

  showModal:boolean = false;

  constructor(
    private _http:HttpClient,
    private _authService:AuthService
  ){}

  ngOnInit(): void {
    this._authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  prueba(){
    console.log('Salir')
    this._http.get<any>("http://localhost:3000/salir").subscribe(
      next=>{console.log('Correct: ',next)},
      error=>{console.log('Error: ',error)}
    )
  }
  openModal(message:string): void {
    // Usa el ID de tu modal para obtener el elemento
    // const miModalElement = document.getElementById('myModal');
    // const miModal = new bootstrap.Modal(miModalElement);
    // miModal.show();
    this.modal.openModal(message);
    // this.showModal=true;
  }
}
