import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private createQuestionsForLessonUrl = this.config.baseUrl + 'v1/lessons/1/questions';
  private getQuestionByLessonIdUrl = this.config.baseUrl + 'v1/lessons/1/questions?order=asc&perPage=50&page=1';
  private acceptQuestionByTeacherUrl = this.config.baseUrl + 'v1/lessons/12/questions/24/accept';
  constructor(private http: HttpClient,
              private config: AppConfig) { }
  // @ts-ignore
  createQuestionsForLesson(question: any): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.post('http://localhost:8000/v1/lessons/' + Number(localStorage.getItem('lesId'))+ '/questions', question, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getQuestionByLessonId(): Observable<any>{
    // @ts-ignore
    return this.http.get('http://localhost:8000/v1/lessons/' + Number(localStorage.getItem('lesId'))+ '/questions?order=asc&perPage=50&page=1').pipe(map((response: Response) => {
      return response;
    }));
  }
  acceptQuestionByTeacher(): Observable<any>{
    // @ts-ignore
    return this.http.put(this.acceptQuestionByTeacherUrl).pipe(map((response: Response) => {
      return response;
    }));
  }
  postAnswers(answers: any): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.post(this.createQuestionsForLessonUrl, answers, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  accept(id: any): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/json'
      }
    };
    // @ts-ignore
    return this.http.put('http://localhost:8000/v1/lessons/' + localStorage.getItem('lesId') +'/questions/' + id + '/accept', localStorage.getItem('') ,options).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }
}
