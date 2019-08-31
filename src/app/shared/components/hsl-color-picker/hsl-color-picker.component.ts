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

  public hueStyle(color: HLColor): string {
    return StyleService.colorPickerHueRange(this.color);
  }

  public luminanceStyle(color: HLColor): string {
    return StyleService.colorPickerLuminanceRange(this.color);
  }
}
