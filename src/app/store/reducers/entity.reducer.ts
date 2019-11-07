import { createReducer, on, Action } from '@ngrx/store';
import { Entities } from 'src/app/types/store.types';
import { getBaseInitialState } from './reducers.helpers';

const pEntitiesReducers = createReducer<Entities>(getBaseInitialState());

export function entitiesReducers(state: Entities, action: Action) {
  return pEntitiesReducers(state, action);
}
