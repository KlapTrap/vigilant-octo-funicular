import { createAction, props } from '@ngrx/store';
import { appActionPrefix } from './action-helpers';
import { HttpRequest } from '@angular/common/http';
import { StoreEntityMap, StoreEntityKeys } from 'src/app/types/store.types';

const actionPrefix = `${appActionPrefix}create`;

export interface CreateEntityActionConfig<
  Y extends StoreEntityKeys = StoreEntityKeys
> {
  entityType: Y;
  newEntity: StoreEntityMap[Y];
}

export const startCreateEntity = createAction(
  `${actionPrefix}`,
  props<{
    entityType: string;
    request: HttpRequest<any>;
  }>(),
);

export const createEntitySuccess = createAction(
  `${actionPrefix}/success`,
  props<CreateEntityActionConfig>(),
);

export const createEntityFailure = createAction(
  `${actionPrefix}/failure`,
  props<{
    entityType: string;
  }>(),
);
