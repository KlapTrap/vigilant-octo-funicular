import { Injectable } from '@angular/core';
import {
  StoreState,
  StoreEntityKeys,
  StoreEntityValue,
} from '../types/store.types';
import { Store } from '@ngrx/store';

import { map, filter, shareReplay, startWith, skip } from 'rxjs/operators';
import { selectList } from './selectors/entity-list.selectors';
import { combineLatest, Observable, NEVER } from 'rxjs';
import {
  selectEntitiesOfType,
  selectEntitiy,
} from './selectors/entity.selectors';
import { UserPostWithUser, User, UserPost } from '../types/api-entities.types';
import { startFetchEntityList } from './actions/entity-list.actions';
import { HttpRequest } from '@angular/common/http';
import { initGetEntity } from './actions/entity.actions';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public readonly allListKey = 'all';

  public readonly fetchingUsers$ = this.buildFetchingObservable('user');
  public readonly fetchingPosts$ = this.buildFetchingObservable('post');
  public readonly fetchingPostsOrUser$ = combineLatest(
    this.fetchingUsers$,
    this.fetchingPosts$,
  ).pipe(
    skip(1),
    map(([fetchingUsers, fetchingPosts]) => fetchingUsers || fetchingPosts),
    startWith(true),
  );

  constructor(private store: Store<StoreState>) {}
  private selectUserObsCache: { [userId: number]: Observable<User> } = {};

  private buildFetchingObservable(entityType: StoreEntityKeys) {
    return this.store.select(selectList(entityType, this.allListKey)).pipe(
      filter(list => !!list && !!list.fetchState),
      map(list => list.fetchState.busy),
      startWith(false),
    );
  }

  private _selectUser(userId: number): Observable<User> {
    return this.selectEntity(userId, 'user').pipe(shareReplay(1)) as Observable<
      User
    >;
  }

  private selectUser(userId: number) {
    if (this.selectUserObsCache[userId]) {
      return this.selectUserObsCache[userId];
    }
    this.selectUserObsCache[userId] = this._selectUser(userId);
    return this.selectUserObsCache[userId];
  }

  public selectEntity<T extends StoreEntityKeys>(id: number, entityType: T) {
    return this.store.select(selectEntitiy(entityType, id)) as Observable<
      StoreEntityValue<T>
    >;
  }

  public getPostsWithUser(): Observable<UserPostWithUser[]> {
    return combineLatest(
      this.selectEntityList('post'),
      this.store.select(selectEntitiesOfType('post')),
    ).pipe(
      filter(
        ([list, entities]) =>
          !!list && !!entities && Object.keys(entities).length > 0,
      ),
      map(([list, entities]) =>
        list.ids.map(id => this.mapPostToPostWithUser(entities[id])),
      ),
    );
  }

  public mapPostToPostWithUser(post: UserPost): UserPostWithUser {
    return {
      ...post,
      user$: post ? this.selectUser(post.userId) : NEVER,
    };
  }

  public selectEntityList<T extends StoreEntityKeys>(
    entityType: T,
    listKey = this.allListKey,
  ) {
    return combineLatest(
      this.store.select(selectList(entityType, listKey)),
      this.store.select(selectEntitiesOfType(entityType)),
    ).pipe(
      map(([entityList, entites]) => entityList.ids.map(id => entites[id])),
    );
  }

  public buildListKey(id?: number) {
    return id ? `${this.allListKey}/${id}` : this.allListKey;
  }

  public fetchPosts() {
    this.store.dispatch(
      startFetchEntityList({
        entityType: 'post',
        listKey: this.allListKey,
        request: new HttpRequest(
          'GET',
          'https://jsonplaceholder.typicode.com/posts',
        ),
      }),
    );
  }

  public fetchUsers() {
    this.store.dispatch(
      startFetchEntityList({
        entityType: 'user',
        listKey: this.allListKey,
        request: new HttpRequest(
          'GET',
          'https://jsonplaceholder.typicode.com/users',
        ),
      }),
    );
  }

  public fetchComments(postId: number) {
    this.store.dispatch(
      startFetchEntityList({
        entityType: 'comment',
        listKey: this.buildListKey(postId),
        request: new HttpRequest(
          'GET',
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        ),
      }),
    );
  }

  public fetchPost(id: number) {
    this.store.dispatch(
      initGetEntity({
        entityType: 'post',
        id,
      }),
    );
  }

  public fetchUser(id: number) {
    this.store.dispatch(
      initGetEntity({
        entityType: 'user',
        id,
      }),
    );
  }
}
