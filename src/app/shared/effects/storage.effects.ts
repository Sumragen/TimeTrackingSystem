import {Injectable} from "@angular/core";
import {Actions, ofType, createEffect} from "@ngrx/effects";
import {map, exhaustMap} from "rxjs/internal/operators";
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {Device} from "@ionic-native/device/ngx";
import {TimeService} from "../time/time.service";
import {StorageService} from "../services/storage/storage.service";

@Injectable()
export class StorageEffects {
    constructor(private actions$: Actions,
                private storageService: StorageService,
                private timeService: TimeService) {
    }

    record$ =
        createEffect(() => this.actions$.pipe(
            ofType('record'),
            exhaustMap((action) => fromPromise(
                Promise.resolve(action).then(async(action: any) => {
                    const time = this.timeService.performCalculation(action.payload.target);

                    if (!!time) {
                        const value = {
                            ...time,
                            description: action.payload.description
                        };

                        const storage: any = await this.storageService.getRecords() || {};

                        const type: string = action.payload.type;
                        if(!storage[type]){
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