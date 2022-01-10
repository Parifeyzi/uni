import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AppConfig} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUrl = this.config.baseUrl + 'v1/register';
  private loginUrl = this.config.baseUrl + 'v1/login';
  private getMeUrl =  this.config.baseUrl + 'v1/auth/me/';
  constructor(private http: HttpClient,
              private config: AppConfig,) { }
  // @ts-ignore
  register(user: any): Observable<any>{
    // @ts-ignore
    return this.http.post(this.registerUrl, user).pipe(map((response: Response) => {
      return response;
    }));
  }
  login(user: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.loginUrl, user).pipe(map((response: Response) => {
      return response;
    }));
  }
  getMe(): Observable<any> {
    const options = {
      // responseType: 'text',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
    // @ts-ignore
    return this.http.get(this.getMeUrl, options).pipe(map((response: Response) => {
      return response;
    }));
  }

}
