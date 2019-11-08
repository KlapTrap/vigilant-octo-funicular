import { createReducer, on, Action } from '@ngrx/store';
import { getBaseInitialState } from './reducers.helpers';
import { Entities } from '../../types/store.types';
import { fetchEntityListSuccess } from '../actions/entity-list.actions';

const pEntitiesReducers = createReducer<Entities>(
  getBaseInitialState(),
  on(fetchEntityListSuccess, (state, action) => ({
    ...state,
    [action.entityType]: {
      ...(state[action.entityType] || {}),
      ...action.normalisedResponse.entities,
    },
  })),
);

export function entitiesReducers(state: Entities, action: Action) {
  return pEntitiesReducers(state, action);
}
