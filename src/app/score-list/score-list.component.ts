import { Component, OnInit } from '@angular/core';
import {ExamsService} from "../services/exams.service";

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {
  public response: any;
  public questions: any;
  constructor(private examService: ExamsService) { }

  ngOnInit(): void {
    this.getDetail();
  }
  getDetail(): any{
    this.examService.getExamDetailByTeacher().subscribe(
      (data) => {
        this.response = data.data;
        this.questions = data.data.questions;
      }
    );
  }
  getExamId(id: any): any{
    localStorage.setItem('exId', id);
  }
}
