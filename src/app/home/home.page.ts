import {Component, OnDestroy} from "@angular/core";
import {Store, select} from "@ngrx/store";
import {Subscription} from "rxjs";
import {ButtonState} from "../shared/store/reducers";
import {STORE_STATE, BUTTON_STATE_KEY} from "../shared/store/store";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

    public button: ButtonState;
    public description: string;
    private state$: Subscription;

    constructor(private store: Store<STORE_STATE>) {
        this.state$ = this.store.pipe(select(BUTTON_STATE_KEY))
            .subscribe((state: ButtonState) => {
                this.button = state;
            })
    }

    public ngOnDestroy() {
        this.state$.unsubscribe();
    }

    public buttonClick() {
        this.store.dispatch({
            type: 'record',
            payload: {
                target: this.button.target,
                description: this.description
            }
        });
    }
}
