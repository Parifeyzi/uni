import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ExamRepository} from "../models/ExamRepository";

@Component({
  selector: 'app-select-type-of-exam',
  templateUrl: './select-type-of-exam.component.html',
  styleUrls: ['./select-type-of-exam.component.css']
})
export class SelectTypeOfExamComponent implements OnInit {
  public examRepository: ExamRepository;
  public lessonTitle: any;
  constructor(private router: Router,
    private injector: Injector,) {
      this.examRepository = ExamRepository.getInstance(injector);
    }

  ngOnInit(): void {
    this.lessonTitle = localStorage.getItem('lessonTitle');
  }
  navigateToFormal(): any{
    this.router.navigateByUrl('/createExam').then();
  }
  navigateToinFormal(): any{
    this.router.navigateByUrl('/createExam').then();
  }
}
