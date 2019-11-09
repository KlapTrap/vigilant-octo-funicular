import { Observable } from 'rxjs';

// Interfaces that represents the entities from https://jsonplaceholder.typicode.com

export interface User {
  id: number;
  name: string;
}

export interface UserPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UserPostWithUser extends UserPost {
  user$: Observable<User>;
}

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface AlbumPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface UserAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface UserTodo {
  userId: number;
  id: number;
  title: string;
  completeed: boolean;
}
