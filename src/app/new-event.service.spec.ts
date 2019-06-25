import { TestBed } from '@angular/core/testing';

import { NewEventService } from './new-event.service';

describe('NewEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewEventService = TestBed.get(NewEventService);
    expect(service).toBeTruthy();
  });
});
