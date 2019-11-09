import { createAction, props } from '@ngrx/store';
import { appActionPrefix } from './action-helpers';
import { HttpRequest } from '@angular/common/http';
import { StoreEntityKeys, StoreEntityValue } from 'src/app/types/store.types';
import { NormalisedResponse } from './entity-list.actions';

const actionPrefix = `${appActionPrefix}create`;
export type EntityWithoutId<T extends StoreEntityKeys> = Omit<
  StoreEntityValue<T>,
  'id'
>;
export interface CreateEntityActionConfig<T extends StoreEntityKeys> {
  entityType: T;
  newEntity: EntityWithoutId<T>;
}

export interface CreateedEntityActionConfig<
  Y extends StoreEntityKeys = StoreEntityKeys
> {
  entityType: Y;
  normalisedResponse: NormalisedResponse;
}

export const startCreateEntity = createAction(
  `${actionPrefix}`,
  props<CreateEntityActionConfig<StoreEntityKeys>>(),
);

export const createEntitySuccess = createAction(
  `${actionPrefix}/success`,
  props<CreateedEntityActionConfig>(),
);

export const createEntityFailure = createAction(
  `${actionPrefix}/failure`,
  props<{
    entityType: StoreEntityKeys;
  }>(),
);
