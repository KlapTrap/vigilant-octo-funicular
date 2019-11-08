import {
  UserPost,
  PostComment,
  AlbumPhoto,
  UserAlbum,
  UserTodo,
} from './api-entities.types';

//
// Api Entity related
//
export interface StoreEntityMap {
  post: UserPost;
  comment: PostComment;
  photo: AlbumPhoto;
  album: UserAlbum;
  toto: UserTodo;
}

export type StoreEntityKeys = keyof StoreEntityMap;
export type StoreEntityValues = StoreEntityMap[StoreEntityKeys];
export type StoreEntityValue<T extends StoreEntityKeys> = StoreEntityMap[T];

export interface RequestState {
  busy: boolean;
  error: boolean;
  errorMessage: string;
}

// Represents a unique list of entities
export interface EntityList<Y extends StoreEntityKeys> {
  ids: number[];
  fetchState: RequestState;
  entityType: Y;
}

export type EntityLists = {
  [entityType in StoreEntityKeys]: {
    [listKey: string]: EntityList<entityType>;
  };
};
export interface EntityOfType<T extends StoreEntityKeys> {
  [entityId: number]: StoreEntityValue<T>;
}

export type Entities = {
  [entityType in StoreEntityKeys]: EntityOfType<entityType>;
};

export type EntityRequests = {
  [key in StoreEntityKeys]: {
    [entityId: number]: RequestState;
  };
};

//
// Api Entity related ended
//

export interface StoreState {
  entityLists: EntityLists;
  entites: Entities;
  entityRequests: EntityRequests;
}
