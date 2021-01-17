import { TestBed } from '@angular/core/testing';

import { ImportantDayService } from './important-day.service';

describe('ImportantDayService', () => {
  let service: ImportantDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportantDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
