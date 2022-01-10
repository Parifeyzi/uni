import { Component, OnInit } from '@angular/core';
import {ExamsService} from "../services/exams.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher-student-list',
  templateUrl: './teacher-student-list.component.html',
  styleUrls: ['./teacher-student-list.component.css']
})
export class TeacherStudentListComponent implements OnInit {
  public students: any;
  constructor(private examService: ExamsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents(): any{
    this.examService.getStudents().subscribe(
      (data) => {
        console.log(data);
        this.students = data.data.students;
      }
    );
  }
  navigateToDetailPage(id: any): any{
    console.log(id);
    localStorage.setItem('studentId', id);
    this.router.navigateByUrl('/score-list').then();
  }
}
