import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HSLColor } from '../../models/colors.models';
import { StyleService } from '../../services/style/style.service';

@Component({
  selector: 'app-hsl-color-picker',
  templateUrl: './hsl-color-picker.component.html',
  styleUrls: ['./hsl-color-picker.component.scss']
})
export class HslColorPickerComponent implements OnInit {
  @Input() public color: HSLColor;
  @Output() public colorChange: EventEmitter<HSLColor> = new EventEmitter<HSLColor>(false);

  constructor() {}

  ngOnInit() {}

  public hueStyle(): string {
    return StyleService.colorPickerHueRange(this.color);
  }

  public luminanceStyle(): string {
    return StyleService.colorPickerLuminanceRange(this.color);
  }

  public saturationStyle(): string {
    return StyleService.colorPickerSaturationRange(this.color);
  }
}
