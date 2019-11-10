import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  HttpClient,
  HttpResponse,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Action } from '@ngrx/store';
import { map, last, tap, mergeMap } from 'rxjs/operators';
import {
  StoreEntityValues,
  StoreEntityKeys,
  StoreEntityValue,
} from 'src/app/types/store.types';
import { EntityNormaliser } from './normaliser';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  startCreateEntity,
  createEntitySuccess,
  EntityWithoutId,
} from '../actions/entity.actions';

@Injectable()
export class EntityCreateEffect {
  public createEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startCreateEntity),
      mergeMap(action =>
        this.makeCreateEntityRequest(action.entityType, action.newEntity),
      ),
    ),
  );

  private makeCreateEntityRequest<T extends StoreEntityKeys>(
    entityType: T,
    newEntity: EntityWithoutId<T>,
  ) {
    const request = new HttpRequest<EntityWithoutId<T>>(
      'POST',
      `https://jsonplaceholder.typicode.com/${entityType}s`,
      newEntity,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json; charset=UTF-8',
        }),
      },
    );
    return this.httpClient.request(request).pipe(
      last(),
      map((response: HttpResponse<StoreEntityValue<T>>) => {
        const normalisedResponse = EntityNormaliser.normaliseEntity({
          ...newEntity,
          ...response.body,
        });
        return createEntitySuccess({
          entityType,
          id: response.body.id,
          normalisedResponse,
        });
      }),
    );
  }

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
