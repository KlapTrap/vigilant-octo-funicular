import { createAction, props } from '@ngrx/store';
import { HttpRequest } from '@angular/common/http';
import { StoreEntityMap } from 'src/app/types/store.types';

const actionPrefix = '@thisApp/fetchEntityList/';

export interface ListRequestLifeCycleAction {
  entityType: keyof StoreEntityMap;
  listKey: string;
}

export interface ListRequestSuccessAction {
  entityType: keyof StoreEntityMap;
  listKey: string;
  normalisedResponse: {
    ids: number[];
    entities: {
      [entityId: number]: StoreEntityMap[keyof StoreEntityMap];
    };
  };
}

export interface ListInitiateRequestAction extends ListRequestLifeCycleAction {
  request: HttpRequest<any>;
}

export const startFetchEntityList = createAction(
  `${actionPrefix}initiate`,
  props<ListInitiateRequestAction>(),
);

export const fetchEntityList = createAction(
  `${actionPrefix}fetch`,
  props<ListRequestLifeCycleAction>(),
);

export const fetchEntityListSuccess = createAction(
  `${actionPrefix}success`,
  props<ListRequestSuccessAction>(),
);

export const fetchEntityListFailure = createAction(
  `${actionPrefix}failure`,
  props<ListRequestLifeCycleAction>(),
);
