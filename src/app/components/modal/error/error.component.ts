import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectError } from '../../../store/error/error.selector';
declare var bootstrap: any;
@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorModalComponent {
  modal_message:any;

  constructor(
    private _store:Store<AppState>
  ){}

  openModal(): void {
    this._store.select(selectError).subscribe(data=>this.modal_message = data.errorMessage)
    // Usa el ID de tu modal para obtener el elemento
    const miModalElement = document.getElementById('myErrorModal');
    const miModal = new bootstrap.Modal(miModalElement);
    miModal.show();
  }
}
