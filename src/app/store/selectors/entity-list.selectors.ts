import {
  StoreEntityKeys,
  StoreState,
  EntityLists,
} from 'src/app/types/store.types';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectListState = createFeatureSelector<StoreState, EntityLists>(
  'entityLists',
);

export const selectListsOfType = <T extends StoreEntityKeys>(entityType: T) =>
  createSelector(
    selectListState,
    types => (types ? types[entityType] : null) as EntityLists[T],
  );

export const selectList = <T extends StoreEntityKeys>(
  entityType: T,
  listType: string,
) =>
  createSelector(
    selectListsOfType<T>(entityType),
    types => types[listType],
  );
