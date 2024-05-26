import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/message/modal.component';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }
  
  openModal(errorMessage:string): void {
    // Usa el ID de tu modal para obtener el elemento
    const miModalElement = document.getElementById('myModal');
    const miModal = new bootstrap.Modal(miModalElement);
    miModal.show();
  }
}
