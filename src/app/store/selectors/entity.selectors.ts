import {
  StoreEntityKeys,
  StoreState,
  Entities,
} from 'src/app/types/store.types';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectEntitiesState = createFeatureSelector<StoreState, Entities>(
  'entites',
);

export const selectEntitiesOfType = <T extends StoreEntityKeys>(
  entityType: T,
) =>
  createSelector(
    selectEntitiesState,
    types => (types ? types[entityType] : null),
  );

export const selectEntitiy = <T extends StoreEntityKeys>(
  entityType: T,
  entityId: number,
) =>
  createSelector(
    selectEntitiesOfType<T>(entityType),
    types => types[entityId],
  );
