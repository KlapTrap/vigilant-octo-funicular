import { createAction, props } from '@ngrx/store';
import { HttpRequest } from '@angular/common/http';
import { StoreEntityKeys, StoreEntityValues } from 'src/app/types/store.types';

const actionPrefix = '@thisApp/fetchEntityList/';

export interface ListRequestLifeCycleAction {
  entityType: StoreEntityKeys;
  listKey: string;
}
export interface NormalisedResponse {
  ids: number[];
  entities: {
    [entityId: number]: StoreEntityValues;
  };
}
export interface ListRequestSuccessAction {
  entityType: StoreEntityKeys;
  listKey: string;
  normalisedResponse: NormalisedResponse;
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
