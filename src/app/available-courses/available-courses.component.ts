import { Component, OnInit, Injector } from '@angular/core';
import {Router} from "@angular/router";
import {AvailableCourses} from "../models/available-courses.model";
import {ExamRepository} from "../models/ExamRepository";
import {Result} from "../models/result.model";
import {LessonsService} from "../services/admin/lessons.service";

@Component({
  selector: 'app-available-courses',
  templateUrl: './available-courses.component.html',
  styleUrls: ['./available-courses.component.css']
})
export class AvailableCoursesComponent implements OnInit {
  public availableCourses: AvailableCourses | any = new AvailableCourses();
  public examRepository: ExamRepository;
  public result: Result | any = new Result();
  constructor(private router: Router,
              private lessonsService: LessonsService,
              public injector: Injector,
              ) {
                this.examRepository = ExamRepository.getInstance(injector);
              }

  ngOnInit(): void {
    this.getAllAvailableLessons();
    this.getTeacherLessonById();
  }
  navigateToCreateQuestion(id: any): any{
    console.log(id);
    localStorage.setItem('lesId', id);
    this.router.navigateByUrl('/lessons/create-question').then();
  }
  getAllAvailableLessons(): any{
    this.lessonsService.getLessons().subscribe(
      (data) => {
        this.examRepository.lessons = data.data;
        console.log(data.data);
      }
    );
  }
  getTeacherLessonById(): any{
  this.lessonsService.getTeacherLessonById().subscribe(
    (data) => {
      this.examRepository.teacherLessons = data.data;
      console.log(data);
    }
  );
  }
}
