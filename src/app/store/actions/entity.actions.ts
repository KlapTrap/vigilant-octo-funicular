import { createAction, props } from '@ngrx/store';
import { appActionPrefix } from './action-helpers';
import { HttpRequest } from '@angular/common/http';

const actionPrefix = `${appActionPrefix}create`;

export const startCreateEntity = createAction(
  `${actionPrefix}`,
  props<{
    entityType: string;
    request: HttpRequest<any>;
    listKey?: string;
  }>(),
);

export const createEntitySuccess = createAction(
  `${actionPrefix}/success`,
  props<{
    entityType: string;
    request: HttpRequest<any>;
    listKey?: string;
  }>(),
);

export const createEntityFailure = createAction(
  `${actionPrefix}/failure`,
  props<{
    entityType: string;
    request: HttpRequest<any>;
    listKey?: string;
  }>(),
);
