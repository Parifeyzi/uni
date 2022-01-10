/**
 * Created by Parisa on 9/5/2021.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {
  public baseUrl = 'http://localhost:8000/';
  public snackBurDuration = 5000;
  public messages = {
    loginSuccess: 'ورود با موفقیت انجام شد',
    loginFailed: 'شماره موبایل یا کد وارد شده اشتباه می باشد',
  };
  public authentication = {
    client_id: '1',
    client_secret: '5eoGdQZZb5wVXmhEtRnzpgSzS44zg9Dx3ZaCWVQ8',
    grant_type: 'password',
    refresh_grant_type: 'refresh_token',
    scope: 'openid offline_access'
  };
}
