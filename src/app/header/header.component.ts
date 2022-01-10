import {Component, Injector, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ExamRepository} from '../models/ExamRepository';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public examRepository: ExamRepository;
  constructor(private router: Router,
              public injector: Injector,) {
    this.examRepository = ExamRepository.getInstance(injector);
  }
  ngOnInit(): void {
  }
  navigateToLogin(): any{
    this.router.navigateByUrl('/login').then();
  }
  navigateToRegister(): any{
    this.router.navigateByUrl('/register').then();
  }
  navigateToCourses(): any{
    this.router.navigateByUrl('/courses').then();
  }
  navigateToResults(): any{
    this.router.navigateByUrl('/results').then();
  }
  navigateToExams(): any{
    this.router.navigateByUrl('/exams').then();
  }
  navigateToScores(): any{
    this.router.navigateByUrl('/scores').then();
  }
  navigateToIndexPage(): any{
    this.examRepository.headerLoginMode = false;
    this.router.navigateByUrl('/login').then();
    localStorage.clear();
    setTimeout(() => {
      location.reload();
    }, 1000)
  }
  navigateToExamList(): any{
    this.router.navigateByUrl('/exam-list').then();
  }
}
