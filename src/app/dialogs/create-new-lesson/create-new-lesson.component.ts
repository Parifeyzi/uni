import {Component, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExamRepository} from "../../models/ExamRepository";
import {Lesson} from "../../models/lesson.model";
import {LessonsService} from "../../services/admin/lessons.service";

@Component({
  selector: 'app-create-new-lesson',
  templateUrl: './create-new-lesson.component.html',
  styleUrls: ['./create-new-lesson.component.css']
})
export class CreateNewLessonComponent implements OnInit {
  public lesson = new Lesson();
  public examRepository: ExamRepository;
  constructor(public dialogRef: MatDialogRef<CreateNewLessonComponent>,
              public injector: Injector,
              private lessonService: LessonsService) {
    this.examRepository = ExamRepository.getInstance(injector);
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }
  save(): any{
    this.examRepository.existCourse = true;
    this.createNewLesson();
    this.close();
  }
  createNewLesson(): any{
    this.lessonService.createLesson(this.lesson).subscribe(
      (data) => {
        this.lessonService.getLessons().subscribe(
          (data) => {
            this.examRepository.lessons = data.data;
          }
        );
      }, (error) => {
        console.log(error);
      }
    );
    this.close();
  }
}
