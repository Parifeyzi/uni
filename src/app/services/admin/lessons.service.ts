import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../app.config";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private adminGetLessonsUrl = this.config.baseUrl + 'v1/lessons';
  private adminCreateLessonsUrl = this.config.baseUrl + 'v1/admin/lessons';
  constructor(private http: HttpClient,
              private config: AppConfig,) { }
  // @ts-ignore
  createLesson(lesson: any): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.post(this.adminCreateLessonsUrl, lesson, options).pipe(map((response: Response) => {
      return response;
    }));
  }
  getLessons(): Observable<any>{
    // const options = {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('token'),
    //   }
    // };
    // @ts-ignore
    return this.http.get(this.adminGetLessonsUrl).pipe(map((response: Response) => {
      return response;
    }));
  }
  getTeacherLessonById(): Observable<any>{
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get('http://localhost:8000/v1/my-lessons?=', options).pipe(map((response: Response) => {
      return response;
    }));
  }
}
