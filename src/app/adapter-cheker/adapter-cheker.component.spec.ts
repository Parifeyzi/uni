import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdapterChekerComponent } from './adapter-cheker.component';

describe('AdapterChekerComponent', () => {
  let component: AdapterChekerComponent;
  let fixture: ComponentFixture<AdapterChekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdapterChekerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterChekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
