import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFoodComponent } from './new-food.component';

describe('NewFoodComponent', () => {
  let component: NewFoodComponent;
  let fixture: ComponentFixture<NewFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
