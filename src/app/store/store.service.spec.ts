import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { getBaseInitialState } from './reducers/reducers.helpers';

describe('StoreService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule],
      providers: [
        provideMockStore({
          initialState: getBaseInitialState(),
        }),
      ],
    }),
  );

  it('should be created', () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
});
