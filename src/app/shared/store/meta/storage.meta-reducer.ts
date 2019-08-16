import { Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { StorageService } from '../../services/storage/storage.service';

export function storageMetaReducer<S, A extends Action = Action>(storageService: StorageService) {
   return function (reducer: ActionReducer<S, A>) {
      return function (state: S, action: A): S {
         const nextState = reducer(state, action);

         if ([INIT, ROOT_EFFECTS_INIT, UPDATE].indexOf(action.type) === -1) {
            storageService.setSavedState(nextState);
         }

         return nextState;
      };
   };
}