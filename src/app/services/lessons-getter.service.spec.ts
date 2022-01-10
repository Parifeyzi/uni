import { TestBed } from '@angular/core/testing';

import { LessonsGetterService } from './lessons-getter.service';

describe('LessonsGetterService', () => {
  let service: LessonsGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonsGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
