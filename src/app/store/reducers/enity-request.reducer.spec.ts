import { entityRequestReducers } from './enity-request.reducer';
import * as ListActions from '../actions/entity-list.actions';

describe('EnityRequestReducer', () => {
  const testEntityType = 'post';
  it('should set request state for entity', () => {
    const normalisedResponse = {
      ids: [8, 5],
      // TODO: We don't need entities, we should loosen the typing to
      // reduce boilerplate.
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
    const newState = entityRequestReducers(
      undefined,
      ListActions.fetchEntityListSuccess({
        entityType: testEntityType,
        listKey: 'test',
        normalisedResponse,
      }),
    );
    const entityType = newState[testEntityType];
    expect(entityType).toBeDefined();
    const entity0 = entityType[normalisedResponse.ids[0]];
    const entity1 = entityType[normalisedResponse.ids[1]];
    expect(entity0).toBeDefined();
    expect(entity1).toBeDefined();
    expect(entity0.busy).toBe(false);
    expect(entity0.error).toBe(false);
    expect(entity0.errorMessage).toBe('');
    expect(entity1.busy).toBe(false);
    expect(entity1.error).toBe(false);
    expect(entity1.errorMessage).toBe('');
  });
});
