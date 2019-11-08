import * as ListActions from '../actions/entity-list.actions';
import { entityListReducers } from './entity-list.reducer';

describe('EnityListReducer', () => {
  const testEntityType = 'post';
  const testEntityListKey = 'listKey';
  it('should set busy request for list', () => {
    const normalisedResponse = {
      ids: [8, 5],
      entities: [
        {
          userId: 1,
          id: 8,
          title: '8 title',
          body: '8 body',
        },
        {
          userId: 2,
          id: 5,
          title: '5 title',
          body: '5 body',
        },
      ],
    };
    const newState = entityListReducers(
      undefined,
      ListActions.fetchEntityListSuccess({
        entityType: testEntityType,
        listKey: testEntityListKey,
        normalisedResponse,
      }),
    );
    const entityType = newState[testEntityType];
    expect(entityType).toBeDefined();
    const entityList = entityType[testEntityListKey];

    expect(entityList).toBeDefined();
    expect(Array.isArray(entityList.ids)).toBe(true);
    expect(entityList.ids.length).toBe(2);
    expect(entityList.ids[0]).toBe(normalisedResponse.ids[0]);
    expect(entityList.ids[1]).toBe(normalisedResponse.ids[1]);
    expect(entityList.fetchState.busy).toBe(false);
    expect(entityList.fetchState.error).toBe(false);
    expect(entityList.fetchState.errorMessage).toBe('');
  });
});
