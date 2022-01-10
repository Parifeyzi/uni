import {Component, Output, EventEmitter, OnInit, Injector} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {ExamRepository} from "../models/ExamRepository";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Output() close = new EventEmitter();
  public examRepository: ExamRepository;
  public auto = true;
  public hhmm = 'hh';
  public ampm = 'am';
  public dial: any = [];
  public hour = '12';
  public minute = '00';

  private date = new Date();
  private onChange = (v: Date) => {};
  private onTouched = () => {};

  constructor(private injector: Injector) {
    this.examRepository = ExamRepository.getInstance(injector);
    const j = 84;
    for (let min = 1; min <= 12; min++) {
      const hh = String(min);
      const mm = String('00' + ((min * 5) % 60)).slice(-2);
      const x = 1 + Math.sin(Math.PI * 2 * (min / 12));
      const y = 1 - Math.cos(Math.PI * 2 * (min / 12));
      this.dial.push({ top: j * y + 'px', left: j * x + 'px', hh, mm });
    }
  }

  public writeValue(v: Date): any {
    this.date = v || new Date();
    const hh = this.date.getHours();
    const mm = this.date.getMinutes();
    this.ampm = hh < 12 ? 'am' : 'pm';
    this.hour = String(hh % 12 || 12);
    this.minute = String('00' + (mm - (mm % 5))).slice(-2);
  }

  public registerOnChange = (fn: any) => (this.onChange = fn);

  public registerOnTouched = (fn: any) => (this.onTouched = fn);

  timeChange($event: string): any {
    if (this.hhmm === 'hh') {
      this.hour = $event;
      if (this.auto) {
        this.hhmm = 'mm';
      }
    } else {
      this.minute = $event;
    }
  }

  rotateHand(): any{
    const deg = this.hhmm === 'hh' ? +this.hour * 5 : +this.minute;
    return `rotate(${deg * 6}deg)`;
  }

  cancel(): any{
    this.close.emit();
    // this.examRepository.showTimer = false;
  }

  ok(): any {
    let hh = +this.hour + (this.ampm === 'pm' ? 12 : 0);
    if ((this.ampm === 'am' && hh === 12) || hh === 24) {
      hh -= 12;
    }
    this.date.setHours(hh);
    this.date.setMinutes(+this.minute);
    this.onChange(this.date);
    const myTime = this.date.toString();
    localStorage.setItem('reminder-time', myTime.substring(16, 21));
    this.examRepository.showTimerValue = localStorage.getItem('reminder-time');
    // this.examRepository.dateData = myTime.substring(16, 21);
    this.close.emit();
    this.examRepository.showTimer = false;
  }

  ngOnInit(): void {
  }
}
