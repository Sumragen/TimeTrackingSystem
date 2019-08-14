import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class DestroyComponent implements OnDestroy {
   public readonly dispose$: Subject<void> = new Subject<void>();

   public ngOnDestroy() {
      this.dispose$.next();
      this.dispose$.complete();
   }
}