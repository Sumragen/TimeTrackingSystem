import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HLColor } from '../../models/colors.models';

@Component({
  selector: 'app-hsl-color-picker',
  templateUrl: './hsl-color-picker.component.html',
  styleUrls: ['./hsl-color-picker.component.scss'],
})
export class HslColorPickerComponent implements OnInit {

  @Input() public color: HLColor;
  @Output() public colorChange: EventEmitter<HLColor> = new EventEmitter<HLColor>(false);

  constructor() { }

  ngOnInit() {}

}
