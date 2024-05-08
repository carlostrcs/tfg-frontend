import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() showModal:boolean = true;
  modal_message:string='';
  modal_title:string='';
  modal_action:string='';
  constructor(){}
  
  openModal(message:string): void {
   switch(message){
    case 'logout':{
      this.modal_action='logout';
      this.modal_title='Logout';
      this.modal_message='Are you sure you want to logout of the page?';
      break;
    }
    case 'deleteAccount':{
      this.modal_action='deleteAccount';
      this.modal_title='Delete Account';
      this.modal_message='Are you sure you want to delete this account?';
      break;
    }
   }
    // Usa el ID de tu modal para obtener el elemento
    const miModalElement = document.getElementById('myModal2');
    const miModal = new bootstrap.Modal(miModalElement);
    miModal.show();
  }

  handleAction(){
    console.log(this.modal_action);
  };
}
