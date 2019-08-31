import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HLColor } from '../../models/colors.models';
import { StyleService } from '../../services/style/style.service';

@Component({
  selector: 'app-hsl-color-picker',
  templateUrl: './hsl-color-picker.component.html',
  styleUrls: ['./hsl-color-picker.component.scss']
})
export class HslColorPickerComponent implements OnInit {
  @Input() public color: HLColor;
  @Output() public colorChange: EventEmitter<HLColor> = new EventEmitter<HLColor>(false);

  constructor() {}

  ngOnInit() {}

  public rangeStyle(color: HLColor): string {
    return StyleService.colorPickerRange(this.color);
  }
}
