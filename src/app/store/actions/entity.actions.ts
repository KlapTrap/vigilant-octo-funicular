import { createAction, props } from '@ngrx/store';
import { appActionPrefix } from './action-helpers';
import { StoreEntityKeys, StoreEntityValue } from 'src/app/types/store.types';
import { NormalisedResponse } from './entity-list.actions';

export interface EntityActionSuccessConfig<
  Y extends StoreEntityKeys = StoreEntityKeys
> {
  entityType: Y;
  id: number;
  normalisedResponse: NormalisedResponse;
}

const createActionPrefix = `${appActionPrefix}create`;
export type EntityWithoutId<T extends StoreEntityKeys> = Omit<
  StoreEntityValue<T>,
  'id'
>;
export interface CreateEntityActionConfig<T extends StoreEntityKeys> {
  entityType: T;
  newEntity: EntityWithoutId<T>;
}

export const startCreateEntity = createAction(
  `${createActionPrefix}`,
  props<CreateEntityActionConfig<StoreEntityKeys>>(),
);

export const createEntitySuccess = createAction(
  `${createActionPrefix}/success`,
  props<EntityActionSuccessConfig>(),
);

export const createEntityFailure = createAction(
  `${createActionPrefix}/failure`,
  props<{
    entityType: StoreEntityKeys;
  }>(),
);

export interface StartGet<T extends StoreEntityKeys> {
  entityType: T;
  id: number;
}

export const initGetEntity = createAction(
  `${createActionPrefix}/init`,
  props<StartGet<StoreEntityKeys>>(),
);

export const startGetEntity = createAction(
  `${createActionPrefix}/start`,
  props<StartGet<StoreEntityKeys>>(),
);

export const getEntitySuccess = createAction(
  `${createActionPrefix}/success`,
  props<EntityActionSuccessConfig>(),
);

export const getEntityFailure = createAction(
  `${createActionPrefix}/failure`,
  props<StartGet<StoreEntityKeys>>(),
);
