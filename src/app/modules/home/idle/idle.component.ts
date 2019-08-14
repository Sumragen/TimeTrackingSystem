import { Component, Input, OnInit } from '@angular/core';
import { RecordInterface } from '../../../shared/models/record';
import { StorageService } from '../../../shared/services/storage/storage.service';

@Component({
   selector: 'app-idle',
   templateUrl: './idle.component.html',
   styleUrls: ['./idle.component.scss'],
})
export class IdleComponent implements OnInit {
   @Input() public record: RecordInterface;
   public types: string[] = [];

   constructor(private storageService: StorageService) { }

   ngOnInit() {
      this.storageService.getKeys().then((types: string[]) => {
         if (!types) {
            return;
         }
         this.types = types.splice(0, 4); // todo: that should be complexity calculation of popular types
      });
   }

}
