import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
  public productForm: FormGroup;
  constructor(private fb:FormBuilder) {
    this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]) ,

    });
  }
  ngOnInit(): void {
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
    this.quantities().push(this.newQuantity());
  }
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }
  onSubmit() {
    console.log(this.productForm.value);
  }
}
