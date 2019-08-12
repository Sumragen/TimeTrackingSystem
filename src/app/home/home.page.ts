import {Component, OnDestroy, OnInit, ChangeDetectorRef} from "@angular/core";
import {Store, select} from "@ngrx/store";
import {Subscription} from "rxjs";
import {ButtonState} from "../shared/store/reducers";
import {STORE_STATE, BUTTON_STATE_KEY} from "../shared/store/store";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    public button: ButtonState;
    public description: string;
    public type: string;
    public customType: string;
    public customTypeChecked: boolean = false;
    public activityTypes: string[];
    private state$: Subscription;

    constructor(private store: Store<STORE_STATE>,
                private cdr: ChangeDetectorRef) {
        this.state$ = this.store.pipe(select(BUTTON_STATE_KEY))
            .subscribe((state: ButtonState) => {
                this.button = state;
            })
    }

    public ngOnInit() {
        this.setupActivityTypes();
    }

    public ngOnDestroy() {
        this.state$.unsubscribe();
    }

    public buttonClick() {
        this.store.dispatch({
            type: 'record',
            payload: {
                target: this.button.target,
                description: this.description,
                type: this.type
            }
        });
    }

    public selectNewActivityInput(): void {
        this.customTypeChecked = true;
        this.cdr.detectChanges();
    }

    public unselectCustomType(): void {
        this.customTypeChecked = false;
    }

    private setupActivityTypes(): void {
        this.activityTypes = ['smoke', 'work', 'eat', 'learn', 'rest']
    }
}
