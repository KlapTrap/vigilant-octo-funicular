import { createAction, props } from '@ngrx/store';

const actionPrefix = '@thisApp/fetchEntityList/';

export const startFetchEntityList = createAction(
  `${actionPrefix}initiate`,
  props<{
    entityType: string;
    url: string;
    listKey?: string;
  }>(),
);

export const fetchEntityList = createAction(
  `${actionPrefix}fetch`,
  props<{
    entityType: string;
    url: string;
    listKey?: string;
  }>(),
);

export const fetchEntityListSuccess = createAction(
  `${actionPrefix}success`,
  props<{
    entityType: string;
    url: string;
    listKey?: string;
  }>(),
);

export const fetchEntityListFailure = createAction(
  `${actionPrefix}failure`,
  props<{
    entityType: string;
    url: string;
    listKey?: string;
  }>(),
);
