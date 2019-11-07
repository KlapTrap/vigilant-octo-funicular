import { StoreEntityMap } from 'src/app/types/store.types';
import { createAction, ActionCreator } from '@ngrx/store';

export const appActionPrefix = '@thisApp/';

export class EntityActionBuilder {
  public start: ActionCreator;
  public success: ActionCreator;
  public failure: ActionCreator;
  constructor(public entityType: keyof StoreEntityMap) {
    this.start = createAction(`${appActionPrefix}${entityType}/start`);
    this.success = createAction(`${appActionPrefix}${entityType}/success`);
    this.failure = createAction(`${appActionPrefix}${entityType}/failure`);
  }
}
