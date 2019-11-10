import { TestBed } from '@angular/core/testing';

import { InfiniteScrollService } from './infinite-scroll.service';

describe('InfiniteScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfiniteScrollService = TestBed.get(InfiniteScrollService);
    expect(service).toBeTruthy();
  });
});
