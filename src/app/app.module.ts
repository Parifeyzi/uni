import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AvailableCoursesComponent } from './available-courses/available-courses.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateNewLessonComponent } from './dialogs/create-new-lesson/create-new-lesson.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { CreateExamComponent } from './create-exam/create-exam.component';
// import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import { CreateQuestionComponent } from './create-question/create-question.component';
import {MatSelectModule} from "@angular/material/select";
import { DebugComponent } from './debug/debug.component';
import {MatNativeDateModule, NativeDateAdapter} from "@angular/material/core";
import {DpDatePickerModule} from "ng2-date-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AdapterChekerComponent} from "./adapter-cheker/adapter-cheker.component";
import { MatCoreModule } from './mat-core/mat-core.module';
import { McqComponent } from './mcq/mcq.component';
import {AppConfig} from "./app.config";
import {PreventLoginAccess} from "./preventLoginAccess";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {PreventTeacherAccess} from "./preventTeacherAccess";
import {PreventStudentAccess} from "./preventStudentAccess";
import {PreventAdminAccess} from "./preventAdminAccess";
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ResultComponent } from './result/result.component';
import { TimerComponent } from './timer/timer.component';
import { ExamsComponent } from './exams/exams.component';
import { ScoresComponent } from './scores/scores.component';
import {CountdownGlobalConfig, CountdownModule} from "ngx-countdown";
import { ExamPageComponent } from './exam-page/exam-page.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { ScoreDetailComponent } from './score-detail/score-detail.component';
import { SelectTypeOfExamComponent } from './select-type-of-exam/select-type-of-exam.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { ExamlListTeacherComponent } from './examl-list-teacher/examl-list-teacher.component';
import { TeacherExamListComponent } from './teacher-exam-list/teacher-exam-list.component';
import { TeacherStudentListComponent } from './teacher-student-list/teacher-student-list.component';

function countdownConfigFactory(): CountdownGlobalConfig {
  // @ts-ignore
  return {locale: undefined, format: `HH:mm:ss` };
}
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AvailableCoursesComponent,
    IndexComponent,
    HeaderComponent,
    AdminComponent,
    CreateNewLessonComponent,
    CreateExamComponent,
    CreateQuestionComponent,
    DebugComponent,
    AdapterChekerComponent,
    McqComponent,
    ForbiddenComponent,
    ResultComponent,
    TimerComponent,
    ExamsComponent,
    ScoresComponent,
    ExamPageComponent,
    QuestionBankComponent,
    ScoreDetailComponent,
    SelectTypeOfExamComponent,
    ScoreListComponent,
    ExamlListTeacherComponent,
    TeacherExamListComponent,
    TeacherStudentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DpDatePickerModule,
    MatCoreModule,
    MatSnackBarModule,
    CountdownModule,
  ],
  providers: [AppConfig, PreventLoginAccess, PreventTeacherAccess, PreventStudentAccess,
              PreventAdminAccess,
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }
