import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswersService {
  private createAnswerForQuestionUrl = this.config.baseUrl + 'v1/lessons/1/questions/36/answers';
  private getAnswersForQuestionUrl = this.config.baseUrl + 'v1/lessons/1/questions/36/answers';
  constructor(private http: HttpClient,
              private config: AppConfig,) { }
  // @ts-ignore
  createAnswerForQuestion(id ,answersArray: any): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.post('http://localhost:8000/v1/lessons/' + Number(localStorage.getItem('lesId'))+ '/questions/' + id + '/answers', answersArray, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getAnswersForQuestion(id: any): Observable<any>{
    // @ts-ignore
    return this.http.get('http://localhost:8000/v1/lessons/' + Number(localStorage.getItem('lesId'))+ '/questions/' + id + '/answers').pipe(map((response: Response) => {
      return response;
    }));
  }
}
