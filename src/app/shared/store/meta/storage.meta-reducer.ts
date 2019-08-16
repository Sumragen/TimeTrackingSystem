import { Action, ActionReducer, INIT } from '@ngrx/store';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { StorageService } from '../../services/storage/storage.service';

export function storageMetaReducer<S, A extends Action = Action>(storageService: StorageService) {
   return function (reducer: ActionReducer<S, A>) {
      return function (state: S, action: A): S {
         const nextState = reducer(state, action);

         if (action.type !== INIT && action.type !== ROOT_EFFECTS_INIT) {
            storageService.setSavedState(nextState);
         }

         return nextState;
      };
   };
}