import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivityTypeButton } from '../../models/activity.types';

@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.scss']
})
export class TypeSelectorComponent implements OnInit {
  @Input() types: ActivityTypeButton[] = [];
  // TODO: change this approach to single ngrx action which determine next steps according to payload (do we need create new activity or not)
  @Output() public typeSelect: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  public selectType(type: string) {
    this.typeSelect.emit(type);
  }
}
