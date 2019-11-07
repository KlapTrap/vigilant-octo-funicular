import { createReducer, on, Action } from '@ngrx/store';
import { EntityRequests } from 'src/app/types/store.types';
import { getBaseInitialState } from './reducers.helpers';

const pEntityRequestReducers = createReducer<EntityRequests>(
  getBaseInitialState(),
);

export function entityRequestReducers(state: EntityRequests, action: Action) {
  return pEntityRequestReducers(state, action);
}
