import { createReducer, on, Action, State } from '@ngrx/store';
import {
  EntityRequests,
  RequestState,
  EntityLists,
  StoreEntityMap,
  EntityList,
} from 'src/app/types/store.types';
import { getBaseInitialState } from './reducers.helpers';
import * as ListActions from '../actions/entity-list.actions';

function setRequestState<Y extends keyof StoreEntityMap>(
  appState: EntityLists,
  entityType: Y,
  listKey: string,
  fetchState: RequestState,
): EntityLists {
  return {
    ...appState,
    [entityType]: {
      ...appState[entityType],
      [listKey]: {
        fetchState,
        ids: [],
        entityType,
      },
    },
  };
}

function completeListRequest<Y extends keyof StoreEntityMap>(
  appState: EntityLists,
  entityType: Y,
  listKey: string,
  ids: number[],
): EntityLists {
  return {
    ...appState,
    [entityType]: {
      ...appState[entityType],
      [listKey]: {
        fetchState: {
          busy: false,
          error: false,
          errorMessage: '',
        },
        ids: [...ids],
        entityType,
      },
    },
  };
}

const pEntityListReducers = createReducer<EntityLists>(
  getBaseInitialState(),
  on(ListActions.fetchEntityList, (state, action) =>
    setRequestState(state, action.entityType, action.listKey, {
      error: false,
      errorMessage: '',
      busy: true,
    }),
  ),
  on(ListActions.fetchEntityListSuccess, (state, action) =>
    completeListRequest(
      state,
      action.entityType,
      action.listKey,
      action.normalisedResponse.ids,
    ),
  ),
  on(ListActions.fetchEntityListFailure, (state, action) =>
    setRequestState(state, action.entityType, action.listKey, {
      error: true,
      errorMessage: 'Oopsie Doopsie, we failed. :(',
      busy: false,
    }),
  ),
);

export function entityListReducers(state: EntityLists, action: Action) {
  return pEntityListReducers(state, action);
}
