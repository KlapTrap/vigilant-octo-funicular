import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { getBaseInitialState } from './reducers/reducers.helpers';
import { getBaseTestStoreProvider } from '../testing/unit-test-helpers';

describe('StoreService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule],
      providers: [getBaseTestStoreProvider()],
    }),
  );

  it('should be created', () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
});
