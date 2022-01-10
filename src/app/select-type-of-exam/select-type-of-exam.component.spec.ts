import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeOfExamComponent } from './select-type-of-exam.component';

describe('SelectTypeOfExamComponent', () => {
  let component: SelectTypeOfExamComponent;
  let fixture: ComponentFixture<SelectTypeOfExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTypeOfExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTypeOfExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
