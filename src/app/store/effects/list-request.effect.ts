import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  startFetchEntityList,
  fetchEntityList,
  ListInitiateRequestAction,
  fetchEntityListSuccess,
} from '../actions/entity-list.actions';
import { Store, Action } from '@ngrx/store';
import { map, last, tap, mergeMap } from 'rxjs/operators';
import { StoreState, StoreEntityMap } from 'src/app/types/store.types';
import { EntityNormaliser } from './normaliser';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ListRequestEffect {
  public fetchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startFetchEntityList),
      tap(action =>
        this.store.dispatch(
          fetchEntityList({
            entityType: action.entityType,
            listKey: action.listKey,
          }),
        ),
      ),
      mergeMap(action => this.makeListRequest(action)),
    ),
  );

  private makeListRequest(
    action: ListInitiateRequestAction,
  ): Observable<Action> {
    return this.httpClient.request(action.request).pipe(
      last(),
      map((response: HttpResponse<StoreEntityMap[keyof StoreEntityMap][]>) => {
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
