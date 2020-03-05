import { TestBed } from '@angular/core/testing';

import { MomentiveService } from './momentive.service';

describe('MomentiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MomentiveService = TestBed.get(MomentiveService);
    expect(service).toBeTruthy();
  });
});
