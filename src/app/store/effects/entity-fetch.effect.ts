import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  HttpClient,
  HttpResponse,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { map, last, tap, mergeMap, filter } from 'rxjs/operators';
import {
  StoreEntityKeys,
  StoreEntityValue,
  StoreState,
} from 'src/app/types/store.types';
import { EntityNormaliser } from './normaliser';
import { combineLatest, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  createEntitySuccess,
  EntityWithoutId,
  initGetEntity,
  getEntitySuccess,
} from '../actions/entity.actions';
import { selectEntitiy } from '../selectors/entity.selectors';

@Injectable()
export class EntityFetchEffect {
  public fetchEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initGetEntity),
      mergeMap(action =>
        combineLatest(
          of(action),
          this.store.select(selectEntitiy(action.entityType, action.id)),
        ),
      ),
      filter(([action, entity]) => !entity),
      mergeMap(([action]) =>
        this.makeFetchEntityRequest(action.entityType, action.id),
      ),
    ),
  );

  private makeFetchEntityRequest<T extends StoreEntityKeys>(
    entityType: T,
    entityId: number,
  ) {
    const request = new HttpRequest<EntityWithoutId<T>>(
      'GET',
      `https://jsonplaceholder.typicode.com/${entityType}s/${entityId}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json; charset=UTF-8',
        }),
      },
    );
    return this.httpClient.request(request).pipe(
      last(),
      map((response: HttpResponse<StoreEntityValue<T>>) => {
        const normalisedResponse = EntityNormaliser.normaliseEntity(
          response.body,
        );
        return getEntitySuccess({
          entityType,
          id: entityId,
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
