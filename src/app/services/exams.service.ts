import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private createExamUrl = this.config.baseUrl + 'v1/lessons/12/exams';
  private selectExamQuestionsUrl = this.config.baseUrl + 'v1/lessons/12/exams/2/questions';
  private finishExamUrl = this.config.baseUrl + 'v1/exams/6/finish';
  private startExamUrl = this.config.baseUrl + 'v1/exams/3/start';
  private getResultUrl = this.config.baseUrl + 'v1/exams/6/result';
  private getExamDetailByTeacherUrl = this.config.baseUrl + 'v1/exams/';
  private getALLResultUrl = 'http://localhost:8000/v1/results?page=1';
  private getExamQuestionUrl = 'http://localhost:8000/v1/lessons/1/questions?order=asc&perPage=50&page=1';
  // private getExamUrl = this.config.baseUrl + 'v1/lessons/12/exams/2/result';
  constructor(private http: HttpClient,
              private config: AppConfig,) { }
  // @ts-ignore
  createExam(exam: any): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.post('http://localhost:8000/v1/lessons/' + Number(localStorage.getItem('lesId')) + '/exams', exam, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  selectExamQuestions(questions: any): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.post('http://localhost:8000/v1/lessons/' + Number(localStorage.getItem('lesId')) + '/exams/' + Number(localStorage.getItem('exId')) +'/questions', questions, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  finishExam(answers: any): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.post('http://localhost:8000/v1/exams/' + + Number(localStorage.getItem('exId')) +'/finish', answers, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  startExamExam(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get('http://localhost:8000/v1/exams/' + Number(localStorage.getItem('exId')) +'/start', options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getResult(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get('http://localhost:8000/v1/exams/' + Number(localStorage.getItem('scoreId')) + '/result', options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getAllResult(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get(this.getALLResultUrl, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getExam(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get(this.createExamUrl, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getExamQuestion(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get('http://localhost:8000/v1/lessons/' + Number(localStorage.getItem('lesId')) + '/questions?order=asc&perPage=50&page=1', options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getExams(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get('http://localhost:8000/v1/exams/', options).pipe(map((response: Response) => {
      return response;
    }));
  }
  // getExamDetailByTeacher(): Observable<any>{
  //   const options = {
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem('token'),
  //     }
  //   };
  //   // @ts-ignore
  //   return this.http.get(this.getExamDetailByTeacherUrl + localStorage.getItem('exId') + '/' + localStorage.getItem('userId'), options).pipe(map((response: Response) => {
  //     return response;
  //   }));
  // }
  getExamDetailByTeacher(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get(this.getExamDetailByTeacherUrl + Number(localStorage.getItem('examId')) + '/' + Number(localStorage.getItem('studentId')) +'/result', options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getStudents(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get('http://localhost:8000/v1/exams/' + Number(localStorage.getItem('examId')) + '/students', options).pipe(map((response: Response) => {
      return response;
    }));
  }
}
