import { provideMockStore } from '@ngrx/store/testing';

import {
  getBaseInitialState,
  getBaseInitialListState,
} from '../store/reducers/reducers.helpers';

export function getBaseTestStoreProvider() {
  return provideMockStore({
    initialState: {
      entities: getBaseInitialState(),
      entityLists: getBaseInitialListState(),
      entityRequests: getBaseInitialState(),
    },
  });
}
