import { TestBed } from '@angular/core/testing';

import { WorkoutGroupService } from './workout-group.service';

describe('WorkoutGroupService', () => {
  let service: WorkoutGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
