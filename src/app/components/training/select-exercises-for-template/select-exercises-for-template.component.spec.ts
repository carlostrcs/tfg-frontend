import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExercisesForTemplateComponent } from './select-exercises-for-template.component';

describe('SelectExercisesForTemplateComponent', () => {
  let component: SelectExercisesForTemplateComponent;
  let fixture: ComponentFixture<SelectExercisesForTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectExercisesForTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectExercisesForTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
