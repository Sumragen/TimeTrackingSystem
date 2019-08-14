import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/internal/operators';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';

import { TimeService } from '../../services/time/time.service';
import { StorageService } from '../../services/storage/storage.service';

export enum STORAGE_EFFECT {
   RECORD = 'RECORD'
}

@Injectable()
export class StorageEffect {
   constructor(private actions$: Actions,
               private storageService: StorageService,
               private timeService: TimeService) {
   }

   record$ =
      createEffect(() => this.actions$.pipe(
         ofType(STORAGE_EFFECT.RECORD),
         exhaustMap((action) => fromPromise(
            Promise.resolve(action).then(async (action: any) => {
               const time = this.timeService.performCalculation(action.payload.target);

               if (!!time) {
                  const value = {
                     ...time,
                     description: action.payload.description
                  };

                  const storage: any = await this.storageService.getRecords() || {};

                  const type: string = action.payload.type;
                  if (!storage[type]) {
                     storage[type] = [];
                  }
                  storage[type].push(value);

                  await this.storageService.setRecords(storage);
               }

               return action;
            })
         )),
         map((action: any) => {
            return {
               type: action.payload.target
            }
         })
      ))
}