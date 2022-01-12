import {Component, Injector, OnInit} from '@angular/core';
import {ExamRepository} from "../models/ExamRepository";
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {CreateNewLessonComponent} from "../dialogs/create-new-lesson/create-new-lesson.component";
import {LessonsService} from "../services/admin/lessons.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public examRepository: ExamRepository;
  public lessons: any = [];
  constructor(private router: Router,
              public injector: Injector,
              public dialog: MatDialog,
              private lessonsService: LessonsService) {
    this.examRepository = ExamRepository.getInstance(injector);
  }
  ngOnInit(): void {
    this.getListOfLessons();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewLessonComponent, {
      width: '350px',
      height: '450px'
    });
  }
  navigateToCreateExam(id: any): any{
    this.router.navigateByUrl('/createExam').then();
  }
  getListOfLessons(): any{
    this.lessonsService.getLessons().subscribe(
      (data) => {
        this.examRepository.lessons = data.data;
      }
    );
  }
  checkLessonsLength(): any{
    return this.examRepository.lessons.length;
  }
  navigateToBank(): any{
    this.router.navigateByUrl('/courses').then();
  }
}
