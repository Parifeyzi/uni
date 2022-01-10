import { Component, OnInit, Injector } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { QuestionsService } from '../services/questions.service';
import {ExamRepository} from "../models/ExamRepository";
import {Router} from "@angular/router";
import {Question} from "../models/question.model";
import {QuestionsAnswersService} from "../services/questions-answers.service";
interface Food {
  value: string;
  viewValue: string;
}
interface Correction {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  public selectedValue: any;
  public test = false;
  public createNewQuestion = true;
  public createStructure = false;
  public disableInput = false;
  public question: any;
  public preAnswers: any;
  public answers: any;
  public questionModel: any = [];
  public generatedQuestion: any;
  public generatedAnswer1: any;
  public generatedAnswer2: any;
  public generatedAnswer3: any;
  public generatedAnswer4: any;
  public productForm: FormGroup;
  public questionArray = []
  foods: Food[] = [
    {value: '1', viewValue: 'ریاضی'},
    {value: '2', viewValue: 'فیزیک'},
    {value: '3', viewValue: 'شیمی'}
  ];
  public nvQuestionTitle: any;
  public nvFirstAnswer = false;
  public nvSecondAnswer = false;
  public nvThirdAnswer = false;
  public nvFourthAnswer = false;
  public nvFirstCorrection = 0;
  public nvSecondCorrection = 0;
  public nvThirdCorrection = 0;
  public nvFourthCorrection = 0;
  public checkStudentMode:any;
  public corrections: Correction[] = [
    {value: '1', viewValue: 'درست'},
    {value: '0', viewValue: 'غلط'},
  ];
  public nvOne: any;
  public nvTwo: any;
  public nvThree: any;
  public nvFourth: any;
  public examRepository: ExamRepository;
  constructor(private fb:FormBuilder,
              public questionService: QuestionsService,
              public questionAnswerService: QuestionsAnswersService,
              public injector: Injector,
              private router: Router) {
    this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]) ,
    });
    this.examRepository = ExamRepository.getInstance(injector);
  }

  ngOnInit(): void {
    this.checkStudentMode = localStorage.getItem('role');
    console.log(this.checkStudentMode);
  }
  createNewQuestionFunc(): any{
    this.createNewQuestion = true;
  }
  saveQuestion(): any{
    // this.createStructure = true;
    // this.createNewQuestion = false;
    const createQuestionModel = {
      question: this.question,
      attachment: ''
    }
    this.questionService.createQuestionsForLesson(createQuestionModel).subscribe(
      (data) => {
        console.log(data);
      }
    );
    const answers = [
      [
        {
          answer: localStorage.getItem('a1'),
          isCorrect: 0
        },
        {
          answer: localStorage.getItem('a2'),
          isCorrect: 1
        },
        {
          answer: localStorage.getItem('a3'),
          isCorrect: 0
        },
        {
          answer: localStorage.getItem('a4'),
          isCorrect: 0
        },
      ]
    ];
    this.questionService.postAnswers(answers).subscribe(
      (data) => {
        console.log(data);

      }
    );
  }
  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }
  newQuantity(): FormGroup {
    return this.fb.group({
      firstAnswer: '',
      secondAnswer: '',
      thirdAnswer: '',
      fourthAnswer: '',
    })
  }
  addQuantity() {
    this.disableInput = true;
    this.quantities().push(this.newQuantity());
  }
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }
  onSubmit() {
    this.question = this.productForm.value.name;
    this.preAnswers = this.productForm.value.quantities;
    this.preAnswers = this.preAnswers[0];
    this.answers = Object.entries(this.preAnswers).map(([type, value],) => ({type, value}));
    // console.log(this.question);
    // console.log(this.answers);
    // let answersArr = [];
    // for (let i = 0; i < this.answers.length; i++) {
    // answersArr = this.answers[i].value;
    // console.log(answersArr);
    // }
    localStorage.setItem('q', this.question);
    localStorage.setItem('a1', this.answers[0].value);
    localStorage.setItem('a2', this.answers[1].value);
    localStorage.setItem('a3', this.answers[2].value);
    localStorage.setItem('a4', this.answers[3].value);
    this.generatedQuestion = localStorage.getItem('q');
    this.generatedAnswer1 = localStorage.getItem('a1');
    this.generatedAnswer2 = localStorage.getItem('a2');
    this.generatedAnswer3 = localStorage.getItem('a3');
    this.generatedAnswer4 = localStorage.getItem('a4');
    const question = new Question();
    question.question = localStorage.getItem('q');
    question.answer1 = localStorage.getItem('a1');
    question.answer2 = localStorage.getItem('a2');
    question.answer3 = localStorage.getItem('a3');
    question.answer4 = localStorage.getItem('a4');
    this.questionModel.push(question);
    console.log(this.questionModel);
    localStorage.setItem('questionModel', JSON.stringify(this.questionModel));
    alert('سوال ها و جواب ها با موفقیت ثبت شدند.');
  }
  showQuestions(): any{
    this.examRepository.showQuestions = true;
    this.createNewQuestion = false;
  }
  changeToAccepted(): any{
    this.examRepository.isAccepted = true;
  }
  navigateToCreateNewExam(): any{
    this.router.navigateByUrl('/select_type').then();
  }
  navigateToBank(): any{
    this.router.navigateByUrl('/bank').then();
  }
  logger(): any{
    const data = {
      answers: [
        {
          answer: this.nvOne,
          isCorrect: this.nvFirstCorrection
        },
        {
          answer: this.nvTwo,
          isCorrect: this.nvSecondCorrection
        },
        {
          answer: this.nvThree,
          isCorrect: this.nvThirdCorrection
        },
        {
          answer: this.nvFourth,
          isCorrect: this.nvFourthCorrection
        },
      ]
    };
    console.log(data);
    this.questionAnswerService.createAnswerForQuestion(Number(localStorage.getItem('questionId')), data).subscribe(
      (data) => {
        console.log(data);
        this.nvFirstAnswer = false;
        this.nvSecondAnswer = false;
        this.nvThirdAnswer = false;
        this.nvFourthAnswer = false;
        this.nvQuestionTitle = '';
        this.nvOne = '';
        this.nvTwo = '';
        this.nvThree = '';
        this.nvFourth = '';
        this.nvFirstCorrection = 0;
        this.nvSecondCorrection = 0;
        this.nvThirdCorrection = 0;
        this.nvFourthCorrection = 0;
      }
    )
  }
  addSecondAnswer(): any{
    this.nvSecondAnswer = true;
  }
  addThirdAnswer(): any{
    this.nvThirdAnswer = true;
  }
  addFourthAnswer(): any{
    this.nvFourthAnswer = true;
  }
  createQuestionForLesson(): any{
    this.nvFirstAnswer = true;
    this.nvSecondAnswer = false;
    const questionModel = {
      question: this.nvQuestionTitle,
      attachment: ''
    };
    this.questionService.createQuestionsForLesson(questionModel).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('questionId', res.msg.questionId);
        console.log(localStorage.getItem('questionId'));
      }
    )
  }
  onItemChange(value: any){
    console.log(value);
 }
 checkFirst(value: any): any{
  this.nvFirstCorrection === 1;
 }
 checkSecond(value: any): any{
  this.nvSecondCorrection === 1;
 }
 checkThird(value: any): any{
  this.nvThirdCorrection === 1;
 }
 checkFourth(value: any): any{
  this.nvFourthCorrection === 1;
 }
}
