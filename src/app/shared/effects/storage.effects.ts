import {Injectable} from "@angular/core";
import {Actions, ofType, createEffect} from "@ngrx/effects";
import {map, exhaustMap} from "rxjs/internal/operators";
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {Device} from "@ionic-native/device/ngx";
import {TimeService} from "../time/time.service";

export const recordStorageKey: string = 'record_storage';

@Injectable()
export class StorageEffects {
    constructor(private actions$: Actions,
                private storage: NativeStorage,
                private device: Device,
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

                        if (this.device.platform === null) {
                            const storage: any[] = JSON.parse(localStorage.getItem(recordStorageKey)) || [];

                            storage.push(value);

                            localStorage.setItem(recordStorageKey, JSON.stringify(storage));
                        } else {
                            await this.storage.getItem(recordStorageKey).then(async(storage: any[] = []) => {
                                storage.push(value);

                                return await this.storage.setItem(recordStorageKey, storage)
                            });
                        }
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