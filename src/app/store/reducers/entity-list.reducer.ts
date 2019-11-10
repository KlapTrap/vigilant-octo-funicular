import { createReducer, on, Action, State } from '@ngrx/store';
import {
  RequestState,
  EntityLists,
  StoreEntityKeys,
} from 'src/app/types/store.types';
import {
  getBaseInitialState,
  getBaseInitialListState,
} from './reducers.helpers';
import * as ListActions from '../actions/entity-list.actions';
import { createEntitySuccess } from '../actions/entity.actions';

function setRequestState<Y extends StoreEntityKeys>(
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

function completeListRequest<Y extends StoreEntityKeys>(
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
        fromInit: false,
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
  getBaseInitialListState(),
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
  on(createEntitySuccess, (state, action) => {
    return {
      ...state,
      [action.entityType]: {
        ...state[action.entityType],
        all: {
          ...state[action.entityType].all,
          ids: [
            ...action.normalisedResponse.ids,
            ...state[action.entityType].all.ids,
          ],
        },
      },
    };
  }),
);

export function entityListReducers(state: EntityLists, action: Action) {
  return pEntityListReducers(state, action);
}
