import { Component, OnInit } from '@angular/core';
import {ExamsService} from "../services/exams.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  public results: any = [];
  constructor(private examService: ExamsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getResults();
  }
  getResults(): any{
    this.examService.getAllResult().subscribe(
      (res) => {
        this.results = res.data;
        for (let i = 0; i < res.data.length; i++){
          res.data[i].student_id = (res.data[i].result * 20) / res.data[i].questions.length;
        }
      }
    );
  }
  computingScore(score: any): any{
    console.log(score);
  }
  goToScoreDetail(id: any): any{
    localStorage.setItem('scoreId', id);
    console.log(id);
    this.router.navigateByUrl('/scores-detail').then()
  }
}
