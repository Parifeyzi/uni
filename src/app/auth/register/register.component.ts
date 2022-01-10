import {Component, Injector, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {ExamRepository} from "../../models/ExamRepository";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = {
    name: '',
    email: '',
    password: '',
    role: ''
  }
  public examRepository: ExamRepository;
  constructor(private router: Router,
              private userService: UserService,
              private snackBar: SnackBarService,
              public injector: Injector,) {
    this.examRepository = ExamRepository.getInstance(injector);
  }

  ngOnInit(): void {
  }
  navigateToLogin(): any{
    this.router.navigateByUrl('/login').then();
  }
  register(): any{
    this.userService.register(this.user).subscribe(
      (data) => {
        if (data.ok === true){
          localStorage.setItem('token', data.access_token);
          this.examRepository.headerLoginMode = true;
          this.userService.getMe().subscribe(
            (data) => {
                localStorage.setItem('role', data.data.role);
              this.snackBar.showSnackBar(`خوش آمدید ${data.data.name} عزیز`, 'green-snackbar');
              this.router.navigateByUrl('/admin').then();
            }
          );
        } else {
          this.snackBar.showSnackBar('اطلاعات وارد شده، ناقص می باشد.', 'red-snackbar');
        }
      }
    );
  }
}
