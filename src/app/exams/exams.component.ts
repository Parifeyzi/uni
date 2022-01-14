import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {CountdownConfig, CountdownEvent} from "ngx-countdown";
import {ExamRepository} from "../models/ExamRepository";
import {ExamsService} from "../services/exams.service";
import {Router} from "@angular/router";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy {
  public isExamStart = false;
  public examRepository: ExamRepository;
  public notify = '';
  public currentTime: any;
  public testNumber: any;
  public exams: any = [];
  public config: CountdownConfig = { leftTime: 10, notify: [5] };
  public now = new Date().getHours();
  private subscription: Subscription | any;

  public dateNow = new Date();
  public dDay = new Date('12 23 2021 19:30:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;
 constructor(private injector: Injector,
              private examService: ExamsService,
              private router: Router) {
    this.examRepository = ExamRepository.getInstance(injector);
  }

  ngOnInit(): void {
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
    this.currentTime = new Date();
    // console.log(this.currentTime);
    this.getAllExam();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  handleEvent(e: CountdownEvent) {
    this.notify = e.action.toUpperCase();
    if (e.action === 'notify') {
      this.notify += ` - ${e.left} ms`;
    }
    if (e.left === 30){
      this.notify = 'تا زمان شروع آزمون 30 ثانیه مانده است.';
    }
    if (e.action === "done"){
      this.isExamStart = true;
    }
  }
  setToLocalStorage(): any{
    localStorage.setItem('testNumber', this.testNumber);
    this.config.leftTime = Number(localStorage.getItem('testNumber'));
  }
  getAllExam(): any{
    this.examService.getExams().subscribe(
      (data) => {
        this.exams = data.data.data;
        for (let i = 0; i < data.data.data.length; i++){
          // const now = new Date().getHours();
          // const finishedAt= new Date(data.data.data[i].finished_at).getHours();
          const now = new Date().getTimezoneOffset();
          const finishedAt= new Date(data.data.data[i].finished_at).getTimezoneOffset();
          if (now > finishedAt){
            data.data.data[i].created_at = true;
          } else {
            data.data.data[i].created_at = false;
          }
        }
      }
    );
  }
  goToExam(exam: any): any {
    localStorage.setItem('exId', exam.id);
    localStorage.setItem('exTitle', exam.title);
    this.router.navigateByUrl('/exam_page').then();
  }
  private getTimeDifference () {
    // console.log('target');
    for (let i = 0; i < this.exams.length; i++) {
      this.timeDifference = new Date(this.exams[i].started_at).getTime() - new Date().getTime();
      // console.log(this.exams[i].duration);
      this.exams[i].updated_at = [
        {
          secondsToDay: Math.floor((this.timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute),
          minutesToDay: Math.floor((this.timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute),
          hoursToDay: Math.floor((this.timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay),
          daysToDay: Math.floor((this.timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay)),
        }
      ];
      const update = this.exams[i].updated_at;
      for (let p = 0; p < update.length; p++){
        // console.log(update[p].daysToDay);
        if (update[p].daysToDay < 0 && update[p].minutesToDay < -10){
          update[p].id = 'smaller';
        } else if (update[p].hoursToDay > -1 && update[p].minutesToDay > -1) {
          update[p].id = 'bigger';
        }
        // console.log(update[p].minutesToDay + this.exams[i].duration)
        // else if (update[p].minutesToDay + this.exams[i].duration){
        //
        // }
      }
    }
  }

  private allocateTimeUnits (timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }
}
