import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LessonsGetterService {
  private getLessonsUrl = this.config.baseUrl + 'v1/lessons';
  private getAllResultUrl = this.config.baseUrl + 'v1/results';
  private getLessonByIdUrl = this.config.baseUrl + 'v1/lessons/';
  private getTeachersLessonUrl = this.config.baseUrl + 'v1/my-lessons?';
  constructor(private http: HttpClient,
              private config: AppConfig,) { }
  // @ts-ignore
  getLessons(): Observable<any>{
    // @ts-ignore
    return this.http.get(this.getLessonsUrl).pipe(map((response: Response) => {
      return response;
    }));
  }
  // @ts-ignore
  getAllResult(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get(this.getAllResultUrl, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  // @ts-ignore
  getLessonById(): Observable<any>{
    // @ts-ignore
    return this.http.get(this.getLessonByIdUrl + '2').pipe(map((response: Response) => {
      return response;
    }));
  }
  // @ts-ignore
  getTeachersLesson(): Observable<any>{
    // @ts-ignore
    return this.http.get(this.getTeachersLessonUrl).pipe(map((response: Response) => {
      return response;
    }));
  }
}
