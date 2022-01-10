import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExamListComponent } from './teacher-exam-list.component';

describe('TeacherExamListComponent', () => {
  let component: TeacherExamListComponent;
  let fixture: ComponentFixture<TeacherExamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherExamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
