import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { FoodDayTemplate } from '../../models/diet/FoodDayTemplate';

@Component({
  selector: 'app-diet',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,AsyncPipe,NgForOf],
  providers:[DatabaseService],
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css'
})
export class DietComponent implements OnInit{

  templates:FoodDayTemplate[] = []
  templates$:Observable<FoodDayTemplate[]> = of([])
  constructor(
    private _databaseService:DatabaseService
  ){}

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    this._databaseService.getDayFoodTemplates().subscribe((data)=>{
      this.templates = data
      console.log(this.templates)
    })
    
  }

  deleteTemplate(template: any) {
    // Lógica para eliminar la template
    console.log('Deleting template:', template);
    this._databaseService.deleteDietTemplate(template);
    window.location.reload()
  }
}
