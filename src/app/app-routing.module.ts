import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AvailableCoursesComponent} from "./available-courses/available-courses.component";
import {IndexComponent} from "./index/index.component";
import {AdminComponent} from "./admin/admin.component";
import {CreateExamComponent} from "./create-exam/create-exam.component";
import {CreateQuestionComponent} from "./create-question/create-question.component";
import {DebugComponent} from "./debug/debug.component";
import {PreventLoginAccess} from "./preventLoginAccess";
import {PreventTeacherAccess} from "./preventTeacherAccess";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {ResultComponent} from "./result/result.component";
import { PreventAdminAccess } from './preventAdminAccess';
import {ExamsComponent} from "./exams/exams.component";
import {ScoresComponent} from "./scores/scores.component";
import {ExamPageComponent} from "./exam-page/exam-page.component";
import {QuestionBankComponent} from "./question-bank/question-bank.component";
import {ScoreDetailComponent} from "./score-detail/score-detail.component";
import { SelectTypeOfExamComponent } from './select-type-of-exam/select-type-of-exam.component';
import {ScoreListComponent} from "./score-list/score-list.component";
import {TeacherExamListComponent} from "./teacher-exam-list/teacher-exam-list.component";
import {TeacherStudentListComponent} from "./teacher-student-list/teacher-student-list.component";

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'courses', component: AvailableCoursesComponent},
  {path: 'createExam', component: CreateExamComponent},
  {path: 'select_type', component: SelectTypeOfExamComponent},
  {path: 'lessons/create-question', component: CreateQuestionComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'results', component: ResultComponent},
  {path: 'd', component: DebugComponent},
  {path: 'exams', component: ExamsComponent},
  {path: 'scores', component: ScoresComponent},
  {path: 'scores-detail', component: ScoreDetailComponent},
  {path: 'exam_page', component: ExamPageComponent},
  {path: 'admin', component: AdminComponent, canActivate:[PreventAdminAccess]},
  {path: 'bank', component: QuestionBankComponent},
  {path: 'score-list', component: ScoreListComponent},
  {path: 'exam-list', component: TeacherExamListComponent},
  {path: 'students-list', component: TeacherStudentListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
