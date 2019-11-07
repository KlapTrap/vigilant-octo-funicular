import { StoreEntityMap } from 'src/app/types/store.types';
export interface NormalisedResponse<Y extends keyof StoreEntityMap> {
  ids: number[];
  entities: {
    [entityId: number]: StoreEntityMap[Y];
  };
}
export class EntityNormaliser {
  static getBaseNormalisedResult(): NormalisedResponse<any> {
    return {
      ids: [],
      entities: {},
    };
  }
  static normaliseList<Y extends keyof StoreEntityMap>(
    entities: StoreEntityMap[Y][],
  ): NormalisedResponse<Y> {
    return entities.reduce((normed, entity) => {
      return {
        ids: [...normed.ids, entity.id],
        entities: { ...normed.entities, [entity.id]: entity },
      };
    }, EntityNormaliser.getBaseNormalisedResult());
  }
  static normaliseEntity<Y extends keyof StoreEntityMap>(
    entity: StoreEntityMap[Y],
  ): NormalisedResponse<Y> {
    return {
      ids: [entity.id],
      entities: { [entity.id]: entity },
    };
  }
}
