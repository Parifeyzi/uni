import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router} from '@angular/router';
import {AppConfig} from './app.config';

@Injectable()
export class PreventLoginAccess implements CanActivate {

  constructor(private router: Router,
              private appConfig: AppConfig) {

  }
  canActivate(): any {
    const token = localStorage.getItem('token');
    if (token !== null) {
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
