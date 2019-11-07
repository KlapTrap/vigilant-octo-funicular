import { createReducer, on, Action } from '@ngrx/store';
import { EntityLists } from 'src/app/types/store.types';
import { getBaseInitialState } from 'src/app/store/reducers/reducers.helpers';

const pEntityListReducers = createReducer<EntityLists>(getBaseInitialState());

export function entitiesReducers(state: EntityLists, action: Action) {
  return pEntityListReducers(state, action);
}
