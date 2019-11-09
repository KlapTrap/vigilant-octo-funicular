import {
  EntityLists,
  EntityOfType,
  StoreEntityKeys,
  EntityList,
  EntityListsOfType,
} from 'src/app/types/store.types';

export function getBaseInitialState() {
  return {
    post: {},
    album: {},
    comment: {},
    photo: {},
    toto: {},
    user: {},
  };
}
function getDefaultListState<T extends StoreEntityKeys>(
  entityType: T,
): EntityListsOfType<T> {
  return {
    all: {
      entityType,
      fetchState: { busy: false, errorMessage: '', error: false },
      ids: [],
    },
  };
}
export function getBaseInitialListState(): EntityLists {
  return {
    post: getDefaultListState('post'),
    album: getDefaultListState('album'),
    comment: getDefaultListState('comment'),
    photo: getDefaultListState('photo'),
    toto: getDefaultListState('toto'),
    user: getDefaultListState('user'),
  };
}
