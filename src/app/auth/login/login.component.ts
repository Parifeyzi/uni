import {Component, Injector, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ExamRepository} from "../../models/ExamRepository";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = {
    email: '',
    password: ''
  }
  public examRepository: ExamRepository;
  constructor(private userService: UserService,
              private router: Router,
              public injector: Injector,
              private snackBar: SnackBarService) {
    this.examRepository = ExamRepository.getInstance(injector);
  }

  ngOnInit(): void {
    this.examRepository.headerLoginMode = false;
  }
  login(): any{
    this.userService.login(this.user).subscribe((data) => {
      localStorage.setItem('token', data.access_token);
      // localStorage.setItem('', this.user.)
      this.examRepository.headerLoginMode = true;
      this.userService.getMe().subscribe(
        (data) => {
          localStorage.setItem('role', data.data.role);
          if (!localStorage.getItem('role')) {
            this.examRepository.adminMode = false;
            this.examRepository.studentMode = false;
            this.examRepository.teacherMode = false;
          } else if (localStorage.getItem('role') === 'admin') {
            this.examRepository.adminMode = true;
            this.examRepository.studentMode = false;
            this.examRepository.teacherMode = false;
            this.examRepository.unAuthMode = false;
          } else if (localStorage.getItem('role') === 'teacher') {
            this.examRepository.adminMode = false;
            this.examRepository.studentMode = false;
            this.examRepository.teacherMode = true;
            this.examRepository.unAuthMode = false;
          } else if (localStorage.getItem('role') === 'student') {
            this.examRepository.adminMode = false;
            this.examRepository.studentMode = true;
            this.examRepository.teacherMode = false;
            this.examRepository.unAuthMode = false;
          }
          this.snackBar.showSnackBar(`خوش آمدید ${data.data.name} عزیز`, 'green-snackbar');
          this.router.navigateByUrl('/admin').then();
        }
      );
    },() => {
      this.snackBar.showSnackBar('اطلاعات وارد شده، اشتباه می باشد.', 'red-snackbar');
    });
  }
  navigateToRegister(): any{
    this.router.navigateByUrl('/register').then();
  }
}
