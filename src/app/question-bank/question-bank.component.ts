import {Component, Injector, OnInit} from '@angular/core';
import {QuestionsService} from "../services/questions.service";
import {ExamRepository} from "../models/ExamRepository";
import {QuestionsAnswersService} from "../services/questions-answers.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit {
  public examRepository: ExamRepository;
  public acceptIt = false;
  constructor(
              private questionService: QuestionsService,
              private questionAnswerService: QuestionsAnswersService,
              public injector: Injector,
              private http: HttpClient,) {
    this.examRepository = ExamRepository.getInstance(injector);
  }

  ngOnInit(): void {
    this.getQuestions();
  }
  getQuestions(): any{
    this.questionService.getQuestionByLessonId().subscribe(
      (data) => {
        this.examRepository.questions = data.data;
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
  acceptQuestion(question: any): any{
    // console.log(question);
    question.isAccepted = 1;
    // isAccepted = 1;
    console.log(question);
    console.log(question.id);
    this.questionService.accept(question.id).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
