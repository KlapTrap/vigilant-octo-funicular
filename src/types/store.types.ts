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

export interface RequestState {
  busy: boolean;
  error: boolean;
  errorMessage: string;
}

// Represents a unique list of entities
export interface EntityList<Y extends string> {
  ids: number[];
  fetchState: RequestState;
  entityType: Y;
}

export type EntityLists = {
  [entityType in keyof StoreEntityMap]: {
    [listKey: string]: EntityList<entityType>;
  };
};

export type Entities = {
  [entityType in keyof StoreEntityMap]: {
    [entityId: number]: StoreEntityMap[entityType];
  };
};

export type EntityRequests = {
  [key in keyof StoreEntityMap]: {
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
