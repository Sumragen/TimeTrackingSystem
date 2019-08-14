import { Component, Input, OnInit } from '@angular/core';
import { RecordInterface } from '../../../shared/models/record';

@Component({
   selector: 'app-idle',
   templateUrl: './idle.component.html',
   styleUrls: ['./idle.component.scss'],
})
export class IdleComponent implements OnInit {
   @Input() public record: RecordInterface;

   constructor() { }

   ngOnInit() {}

}
