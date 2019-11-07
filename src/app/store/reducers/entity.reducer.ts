import { createReducer, on, Action } from '@ngrx/store';
import { getBaseInitialState } from './reducers.helpers';
import { Entities } from '../../types/store.types';

const pEntitiesReducers = createReducer<Entities>(getBaseInitialState());

export function entitiesReducers(state: Entities, action: Action) {
  return pEntitiesReducers(state, action);
}
