import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamlListTeacherComponent } from './examl-list-teacher.component';

describe('ExamlListTeacherComponent', () => {
  let component: ExamlListTeacherComponent;
  let fixture: ComponentFixture<ExamlListTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamlListTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamlListTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
