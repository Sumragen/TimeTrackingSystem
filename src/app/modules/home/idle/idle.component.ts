import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RecordInterface } from '../../../shared/models/record';
import { StorageService } from '../../../shared/services/storage/storage.service';

@Component({
   selector: 'app-idle',
   templateUrl: './idle.component.html',
   styleUrls: ['./idle.component.scss'],
})
export class IdleComponent implements OnInit {
   public types: string[] = [];
   @Input() public record: RecordInterface;
   @Output() public predefinedType: EventEmitter<string> = new EventEmitter();

   constructor(private storageService: StorageService) { }

   ngOnInit() {
      this.storageService.getKeys().then((types: string[]) => {
         if (!types) {
            return;
         }
         this.types = types.splice(0, 4); // todo: that should be complexity calculation of popular types
      });
   }

   public predefinedTypeClick(type: string): void {
      this.record.type = type;
      this.predefinedType.emit(type);
   }

}
