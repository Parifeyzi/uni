import { Component, OnInit } from '@angular/core';
import {Result} from "../models/result.model";
import {Router} from "@angular/router";
import {LessonsGetterService} from "../services/lessons-getter.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public result: Result | any = new Result();
  constructor(private router: Router,
              private lessonsGetterService: LessonsGetterService) { }

  ngOnInit(): void {
    this.getAllResult();
  }
  getAllResult(): any{
    this.lessonsGetterService.getAllResult().subscribe(
      (data) => {
        this.result = data.data;
      }
    );
  }
}
