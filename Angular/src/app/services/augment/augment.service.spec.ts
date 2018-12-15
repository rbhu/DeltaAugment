import { TestBed } from '@angular/core/testing';

import { AugmentService } from './augment.service';

describe('AugmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AugmentService = TestBed.get(AugmentService);
    expect(service).toBeTruthy();
  });
});
