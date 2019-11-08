import {
  StoreEntityMap,
  StoreEntityKeys,
  StoreEntityValue,
  EntityOfType,
} from 'src/app/types/store.types';
export interface NormalisedResponse<Y extends StoreEntityKeys> {
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
  static normaliseList<Y extends StoreEntityKeys>(
    entities: StoreEntityMap[Y][],
  ): NormalisedResponse<Y> {
    return entities.reduce((normed, entity) => {
      return {
        ids: [...normed.ids, entity.id],
        entities: { ...normed.entities, [entity.id]: entity },
      };
    }, EntityNormaliser.getBaseNormalisedResult());
  }

  static normaliseEntity<Y extends StoreEntityKeys>(
    entity: StoreEntityMap[Y],
  ): NormalisedResponse<Y> {
    return {
      ids: [entity.id],
      entities: { [entity.id]: entity },
    };
  }

  static getListFromIds(entityState: EntityOfType<any>, ids: number[]) {
    return ids.reduce((populatedList, id) => {
      if (entityState[id]) {
        populatedList.push(entityState[id]);
      }
      return populatedList;
    }, []);
  }
}
