import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StyleService } from '../../services/style/style.service';
import { HSLColor } from '../../models/colors.models';

@Component({
  selector: 'app-color-picker-popover',
  templateUrl: './color-picker-popover.component.html',
  styleUrls: ['./color-picker-popover.component.scss']
})
export class ColorPickerPopoverComponent implements OnInit {
  @Input() public color: HSLColor;
  @Input() public label: string;
  public prevColor: HSLColor;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    this.prevColor = { ...this.color };
  }

  public buttonStyle(color: HSLColor): string {
    if (!color) {
      return '';
    }
    return StyleService.button(color);
  }

  public applyColor(): void {
    this.popoverController.dismiss(this.color);
  }

  public cancel(): void {
    this.popoverController.dismiss(null);
  }
}
