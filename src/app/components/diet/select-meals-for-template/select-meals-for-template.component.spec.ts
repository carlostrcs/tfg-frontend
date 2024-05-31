import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMealsForTemplateComponent } from './select-meals-for-template.component';

describe('SelectMealsForTemplateComponent', () => {
  let component: SelectMealsForTemplateComponent;
  let fixture: ComponentFixture<SelectMealsForTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMealsForTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectMealsForTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
