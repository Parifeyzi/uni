import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router} from '@angular/router';
import {AppConfig} from './app.config';

@Injectable()
export class PreventStudentAccess implements CanActivate {

  constructor(private router: Router,
              private appConfig: AppConfig) {

  }
  canActivate(): any {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token !== null && role === 'student') {
      return true;
    } else {
      this.changeUrl();
      return false;
    }
  }
  changeUrl(): any {
    this.router.navigateByUrl('/').then();
  }
}
