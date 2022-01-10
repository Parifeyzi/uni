import { Injectable, Injector } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router} from '@angular/router';
import {AppConfig} from './app.config';
import {ExamRepository} from "src/app/models/ExamRepository";

@Injectable()
export class PreventAdminAccess implements CanActivate {
  public examRepository: ExamRepository;
  constructor(private router: Router,
              private appConfig: AppConfig,
              public injector: Injector,) {
                this.examRepository = ExamRepository.getInstance(injector);

  }
  canActivate(): any {
    // const token = localStorage.getItem('token');
    // if (token !== null) {
    //   return true;
    // } else {
    //   this.changeUrl();
    //   return false;
    // }
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token !== null && role === 'admin') {
      console.log('HI Admin...');
      return true;
    } else {
      this.changeUrl();
      return false;
    }
  }
  changeUrl(): any {
    this.router.navigateByUrl('/').then();
    this.examRepository.headerLoginMode = false;
  }
}
