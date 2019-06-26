import { TestBed } from '@angular/core/testing';

import { EventLocationService } from './event-location.service';

describe('EventLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventLocationService = TestBed.get(EventLocationService);
    expect(service).toBeTruthy();
  });
});
