import { Component, OnInit } from '@angular/core';
import {ExamsService} from "../services/exams.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher-exam-list',
  templateUrl: './teacher-exam-list.component.html',
  styleUrls: ['./teacher-exam-list.component.css']
})
export class TeacherExamListComponent implements OnInit {
  public exams: any;
  constructor(private examService: ExamsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getExamList();
  }
  getExamList(): any{
    this.examService.getExams().subscribe(
      (data) => {
        this.exams = data.data.data;
        console.log(this.exams);
      }
    );
  }
  navigateToStudentsPage(id: any): any{
    localStorage.setItem('examId', id);
    this.router.navigateByUrl('/students-list').then();
  }
}
