import {Component, Injector, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'jalali-moment';
import {IDatePickerConfig} from "ng2-jalali-date-picker";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Exam} from "../models/exam.model";
import {ExamRepository} from "../models/ExamRepository";
import {ExamsService} from "../services/exams.service";
import {SnackBarService} from "../services/snack-bar.service";
import {QuestionsAnswersService} from "../services/questions-answers.service";
import {QuestionsService} from "../services/questions.service";

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  public examRepository: ExamRepository;
  public datePickerData: unknown;
  public showBank = false;
  public showRandomCount = false;
  public randomCount: any;
  public initDate: any;
  public examName = '';
  public examTime = '';
  public examDescription = '';
  public answerList: any;
  public exams = [
    {
      duration: '',
      title: '',
      startedAtDate: '',
      startedAtTime: '',
      description: ''
    }
  ];
  public questionList: any = [];
  public selectedQuestion: any = {
    type: 1,
    questions: []
  };
  public timeLeft: any;
  public interval: any;
  public final: any;
  public saat: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private injector: Injector,
              private examService: ExamsService,
              private snackbarService: SnackBarService,
              private questionService: QuestionsService,
              private questionAnswerService: QuestionsAnswersService,) {
    this.examRepository = ExamRepository.getInstance(injector);
  }

  ngOnInit() {
    this.exams = JSON.parse(<string>localStorage.getItem('exams')!== 'undefined' ? <string>localStorage.getItem('exams') : '[]');
    this.exams = this.exams ? this.exams : [];
    this.getQuestionList();
  }
  navigateToAdmin(): any{
    this.router.navigateByUrl('/admin').then();
  }
  onInput(event: MatDatepickerInputEvent<unknown, unknown | null>): any {
    this.datePickerData = event.value;
  }

  onChange(event: MatDatepickerInputEvent<unknown, unknown | null>): any {
    // @ts-ignore
    const x = moment(event.value).format('jYYYY-jMM-jDD');
    // @ts-ignore
    localStorage.setItem('reminder-date', x);
    // this.examRepository.showTimer = true;
  }
  onShowTimer(): any{
    this.examRepository.showTimer = !this.examRepository.showTimer;
  }
  getQuestions(): any{
    this.questionList = JSON.parse(<string>localStorage.getItem('questionModel')!== 'undefined' ? <string>localStorage.getItem('questionModel') : '[]');
    this.questionList = this.questionList ? this.questionList : [];
  }
  addToExams(): any{
    const exam = new Exam();
    exam.title = this.examName;
    exam.duration = Number(this.examTime);
    exam.description = this.examDescription;
    this.initDate = localStorage.getItem('reminder-date');
    const m = moment(this.initDate, 'jYYYY-jM-jD');
    const a = m.format('jYYYY/jM/jD [is] YYYY/M/D');
    const gregorian = m.format('YYYY-M-D');
    const current = new Date().getTime() / 1000;
    this.saat = localStorage.getItem('reminder-time');
    this.final = moment(gregorian + ' ' + this.saat);
    exam.startedAt = new Date(this.final._d).getTime() / 1000;
    const hourRemind = Math.floor((exam.startedAt - current) / 3600);
    console.log(hourRemind);
    this.examService.createExam(exam).subscribe(
      (data) => {
        this.examService.getExams().subscribe(
          (res) => {
            localStorage.setItem('exId', res.data.data[0].id);
            this.examRepository.showTimerValue = '';
          }
        );
        // console.log(data);
        this.showBank = true;
      }
    );
  }
  getQuestionList(): any{
  // this.examService.getExamQuestion().subscribe(
  //   (data) => {
  //     // console.log(data);
  //     this.questionList = data.data.filter((x: any) => { return x.isAccepted === 1; });
  //     console.log(this.questionList);
  //     for (let i =0 ; i < this.questionList.length ; i++){
  //       console.log(this.questionList[i].id);
  //       this.questionService.getAnswersForQuestion(this.questionList[i].id).subscribe(
  //         (res) => {
  //           // console.log('2');
  //           // console.log(res);
  //           this.answerList = res.data;
  //         }
  //       );
  //     }
  //   }
  // );
    this.questionService.getQuestionByLessonId().subscribe(
      (data) => {
        this.examRepository.questions = data.data.filter((x: any) => { return x.isAccepted === 1; });
        for (let i =0 ; i < this.examRepository.questions.length ; i++){
          this.questionAnswerService.getAnswersForQuestion(this.examRepository.questions[i].id).subscribe(
            (res) => {
              this.examRepository.questions[i].answers = res.data;
              // console.log(this.examRepository.questions[i].answers);
            }
          );
        }
      }
    );
  }
  selectQuestion(q: any): any{
    this.selectedQuestion.questions.push(q.id);
    q.attachment = 'hiiii';
    console.log(this.selectedQuestion);
  }
  finalSelect(): any{
    this.examService.selectExamQuestions(this.selectedQuestion).subscribe(
      (data) => {
        console.log(data);
        this.snackbarService.showSnackBar('آزمون با موفقیت ثبت شد.', 'green-snackbar');
        this.router.navigateByUrl('/lessons/create-question').then();
      }
    );
  }
  addToExamWithRandomCount(): any{
  const data = {
    type: 2,
    count: this.randomCount
    };
    this.examService.selectExamQuestions(data).subscribe(
      (res) => {
        console.log(res);
        this.snackbarService.showSnackBar('آزمون با موفقیت ثبت شد.', 'green-snackbar');
        this.router.navigateByUrl('/lessons/create-question').then();
      }
    );
  }
  addExamWithRandomCount(): any{
    console.log('cliked');

    const exam = new Exam();
    exam.title = this.examName;
    exam.duration = Number(this.examTime);
    exam.description = this.examDescription;
    this.initDate = localStorage.getItem('reminder-date');
    this.saat = localStorage.getItem('reminder-time');
    const m = moment(this.initDate, 'jYYYY-jM-jD');
    const t = moment(this.saat, 'jHH:jMM:jSS');
    const a = m.format('jYYYY/jM/jD [is] YYYY/M/D');
    const s = t.format('jHH:jMM:jSS [is] HH/MM/SS')
    const gregorian = m.format('YYYY-M-D');
    const gregorianTime = t.format('HH/MM/SS');
    const current = new Date().getTime() / 1000;
    this.final = moment(gregorian + ' ' + this.saat);
    exam.startedAt = new Date(this.final._d).getTime() / 1000;
    const hourRemind = Math.floor((exam.startedAt - current) / 3600);
    console.log(hourRemind);
    this.examService.createExam(exam).subscribe(
      (data) => {
        console.log('hi');
        this.examService.getExams().subscribe(
          (res) => {
            localStorage.setItem('exId', res.data.data[0].id);
            this.examRepository.showTimerValue = '';
          }
        );
        this.showRandomCount = true;
      }
    );
  }
}

