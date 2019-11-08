import { createReducer, on, Action, State } from '@ngrx/store';
import { EntityRequests, RequestState } from 'src/app/types/store.types';
import { getBaseInitialState } from './reducers.helpers';
import * as ListActions from '../actions/entity-list.actions';

function setRequestState(
  appState: EntityRequests,
  entityType: string,
  entityId: number,
  state: RequestState,
): EntityRequests {
  return {
    ...appState,
    [entityType]: {
      ...appState[entityType],
      [entityId]: state,
    },
  };
}

const pEntityRequestReducers = createReducer<EntityRequests>(
  getBaseInitialState(),
  on(ListActions.fetchEntityListSuccess, (state, action) =>
    action.normalisedResponse.ids.reduce(
      (newState, id) =>
        setRequestState(newState, action.entityType, id, {
          error: false,
          errorMessage: '',
          busy: false,
        }),
      state,
    ),
  ),
);

export function entityRequestReducers(state: EntityRequests, action: Action) {
  return pEntityRequestReducers(state, action);
}
