import { createReducer, on, Action } from '@ngrx/store';
import { EntityLists } from './node_modules/src/types/store.types';
import { getBaseInitialState } from './reducers.helpers';

const pEntityListReducers = createReducer<EntityLists>(getBaseInitialState());

export function entitiesReducers(state: EntityLists, action: Action) {
  return pEntityListReducers(state, action);
}
