import { Injectable } from '@angular/core';
import { StoreState } from '../types/store.types';
import { Store } from '@ngrx/store';

import { map, filter, shareReplay } from 'rxjs/operators';
import { selectList } from './selectors/entity-list.selectors';
import { combineLatest, Observable } from 'rxjs';
import { selectEntitiesOfType } from './selectors/entity.selectors';
import { UserPostWithUser, User } from '../types/api-entities.types';
import { startFetchEntityList } from './actions/entity-list.actions';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly allListKey = 'all';
  constructor(private store: Store<StoreState>) {}
  private selectUserObsCache: { [userId: number]: Observable<User> } = {};
  private _selectUser(userId: number) {
    return this.store.select(selectEntitiesOfType('user')).pipe(
      map(users => users[userId]),
      shareReplay(1),
    );
  }

  private selectUser(userId: number) {
    if (this.selectUserObsCache[userId]) {
      return this.selectUserObsCache[userId];
    }
    this.selectUserObsCache[userId] = this._selectUser(userId);
    return this.selectUserObsCache[userId];
  }

  public getPostsWithUser(): Observable<UserPostWithUser[]> {
    return combineLatest(
      this.store.select(selectList('post', this.allListKey)),
      this.store.select(selectEntitiesOfType('post')),
    ).pipe(
      filter(
        ([list, entities]) =>
          !!list && !!entities && Object.keys(entities).length > 0,
      ),
      map(([list, entities]) =>
        list.ids.map(id => ({
          ...entities[id],
          user$: this.selectUser(entities[id].userId),
        })),
      ),
    );
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
}
