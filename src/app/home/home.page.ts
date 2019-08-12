import {Component, OnDestroy, OnInit, ChangeDetectorRef} from "@angular/core";
import {Store, select} from "@ngrx/store";
import {Subject} from "rxjs";
import {ButtonState, STOP} from "../shared/store/reducers";
import {STORE_STATE, BUTTON_STATE_KEY} from "../shared/store/store";
import {StorageService} from "../shared/services/storage/storage.service";
import {Actions, ofType} from "@ngrx/effects";
import {takeUntil, tap} from "rxjs/operators";

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
    private destroyed$ = new Subject<boolean>();

    constructor(private store: Store<STORE_STATE>,
                private cdr: ChangeDetectorRef,
                private storageService: StorageService,
                private actions: Actions) {
        this.store.pipe(
            takeUntil(this.destroyed$),
            select(BUTTON_STATE_KEY)
        ).subscribe((state: ButtonState) => {
            this.button = state;
        })
    }

    public ngOnInit() {
        this.setupActivityTypes();
        this.actions.pipe(
            ofType(STOP),
            takeUntil(this.destroyed$),
            tap(() => {
                this.setupActivityTypes();
                this.unselectCustomType();
                this.customType = null;
            })
        ).subscribe();
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    public buttonClick() {
        this.store.dispatch({
            type: 'record',
            payload: {
                target: this.button.target,
                description: this.description,
                type: this.type || this.customType
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

    public isActivityTypeExist(): boolean {
        return !!this.activityTypes && this.activityTypes.length > 0
    }

    private setupActivityTypes(): void {
        this.storageService.getKeys().then((types: string[]) => {
            if (!types) {
                return;
            }
            this.activityTypes = types;
            this.type = types[0];
        });
    }
}
