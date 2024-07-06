import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFoodsForMealComponent } from './select-foods-for-meal.component';

describe('SelectFoodsForMealComponent', () => {
  let component: SelectFoodsForMealComponent;
  let fixture: ComponentFixture<SelectFoodsForMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFoodsForMealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectFoodsForMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
