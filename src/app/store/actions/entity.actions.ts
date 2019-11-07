import { createAction, props } from '@ngrx/store';
import { appActionPrefix } from './action-helpers';

const actionPrefix = `${appActionPrefix}create`;

export const startFetchEntityList = createAction(
  `${actionPrefix}`,
  props<{
    entityType: string;
    url: string;
    listKey?: string;
  }>(),
);

export const fetchEntityListSuccess = createAction(
  `${actionPrefix}/success`,
  props<{
    entityType: string;
    url: string;
    listKey?: string;
  }>(),
);

export const fetchEntityListFailure = createAction(
  `${actionPrefix}/failure`,
  props<{
    entityType: string;
    url: string;
    listKey?: string;
  }>(),
);
