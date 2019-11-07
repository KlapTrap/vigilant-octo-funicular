import { createAction, ActionCreator, props } from '@ngrx/store';
import { appActionPrefix } from './action-helpers';
import { HttpRequest } from '@angular/common/http';

export const initiateApiAction = createAction(
  `${appActionPrefix}initiate`,
  props<{
    entityType: string;
    request: HttpRequest<any>;
    // [StartAction, SuccessAction, FailureAction]
    requestLifeCycleActions: [ActionCreator, ActionCreator, ActionCreator];
  }>(),
);
