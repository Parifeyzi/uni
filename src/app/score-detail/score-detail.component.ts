import { Component, OnInit } from '@angular/core';
import {ExamsService} from "../services/exams.service";

@Component({
  selector: 'app-score-detail',
  templateUrl: './score-detail.component.html',
  styleUrls: ['./score-detail.component.css']
})
export class ScoreDetailComponent implements OnInit {
  public results: any;
  public score: any;
  constructor(public examService: ExamsService) { }

  ngOnInit(): void {
    this.getResult();
  }
  getResult(): any{
    this.examService.getResult().subscribe(
      (data) => {
        console.log(data.data);
        this.results = data.data;
        const result = data.data.result;
        this.score = (result * 20) / data.data.questions.length;
      }
    );
  }
}
