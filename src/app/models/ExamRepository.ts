import {Injector} from '@angular/core';
import { Router } from '@angular/router';

export class ExamRepository {

  protected constructor(private injector: Injector) {
    this.router = injector.get(Router);
    const token = localStorage.getItem('token');
    this.haveToken = token !== null;
    if (!localStorage.getItem('role')) {
      this.unAuthMode = true;
      this.adminMode = false;
      this.studentMode = false;
      this.teacherMode = false;
    } else if (localStorage.getItem('role') === 'admin') {
      this.adminMode = true;
      this.studentMode = false;
      this.teacherMode = false;
      this.unAuthMode = false;
    } else if (localStorage.getItem('role') === 'teacher') {
      this.adminMode = false;
      this.studentMode = false;
      this.teacherMode = true;
      this.unAuthMode = false;
    } else if (localStorage.getItem('role') === 'student') {
      this.adminMode = false;
      this.studentMode = true;
      this.teacherMode = false;
      this.unAuthMode = false;
    }
    // if (localStorage.getItem('donePomodorosWhileTimeCounting') === null) {
    //   this.donePomodorosWhileTimeCounting = 0;
    // } else {
    //   // tslint:disable-next-line:radix
    //   this.donePomodorosWhileTimeCounting = parseInt(localStorage.getItem('donePomodorosWhileTimeCounting'));
    // }
  }

  protected static instance: ExamRepository | any = null;
  public haveToken = false;
  public headerLoginMode = false;
  public existCourse = false;
  public showQuestions = false;
  public isAccepted = false;
  public lessons: any = [];
  public teacherLessons: any = [];
  public questions: any;
  public questionAnswers: any = [];
  public adminMode = false;
  public teacherMode = false;
  public studentMode = false;
  public unAuthMode = true;
  public showTimer = false;
  public showTimerValue:any;
  public backToExamsMode = 'no';
  public informalMode: any;
  public formalMode: any;
  protected router: Router;

  public static getInstance(injector: Injector): ExamRepository {
    if (ExamRepository.instance === null) {
      ExamRepository.instance = new ExamRepository(injector);
      return ExamRepository.instance;
    }
    return ExamRepository.instance;
  }

  isLoggedIn(): any {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  saveToLocalStorage(): any {
    // localStorage.setItem('pomodoroSound', JSON.stringify(this.pomodoroSound));
  }
  navigateToFormal(): any{
    this.formalMode = true;
    this.informalMode = false;
    this.router.navigateByUrl('/createExam').then();
  }
  navigateToinFormal(): any{
    this.formalMode = false;
    this.informalMode = true;
    this.router.navigateByUrl('/createExam').then();
  }
}
