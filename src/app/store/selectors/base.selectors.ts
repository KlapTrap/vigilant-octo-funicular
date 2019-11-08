import { EntityTypeBaseState } from '../../types/store.types';

export const selectEntityType = <T extends EntityTypeBaseState>(
  entityState: T,
  entityType: string,
) => entityState[entityType];

export const selectEntityKey = <T extends EntityTypeBaseState>(
  entityState: T,
  entityType: string,
) => entityState[entityType];
