import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  startFetchEntityList,
  fetchEntityList,
  ListInitiateRequestAction,
  fetchEntityListSuccess,
} from '../actions/entity-list.actions';
import { Store, Action } from '@ngrx/store';
import { map, last, tap, mergeMap, filter } from 'rxjs/operators';
import {
  StoreState,
  StoreEntityValues,
  AllEntityList,
} from 'src/app/types/store.types';
import { EntityNormaliser } from './normaliser';
import { Observable, combineLatest, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { selectList } from '../selectors/entity-list.selectors';

@Injectable()
export class ListRequestEffect {
  public fetchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startFetchEntityList),
      mergeMap(action =>
        combineLatest(
          of(action),
          this.store.select(selectList(action.entityType, action.listKey)),
        ),
      ),
      filter(
        ([action, list]) => !list || (list as AllEntityList<any>).fromInit,
      ),
      tap(([action]) =>
        this.store.dispatch(
          fetchEntityList({
            entityType: action.entityType,
            listKey: action.listKey,
          }),
        ),
      ),
      mergeMap(([action]) => this.makeListRequest(action)),
    ),
  );

  private makeListRequest(
    action: ListInitiateRequestAction,
  ): Observable<Action> {
    return this.httpClient.request(action.request).pipe(
      last(),
      map((response: HttpResponse<StoreEntityValues[]>) => {
        const normalisedResponse = EntityNormaliser.normaliseList(
          response.body,
        );
        return fetchEntityListSuccess({
          entityType: action.entityType,
          listKey: action.listKey,
          normalisedResponse,
        });
      }),
    );
  }

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<StoreState>,
  ) {}
}
