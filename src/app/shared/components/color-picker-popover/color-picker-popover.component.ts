import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-color-picker-popover',
  templateUrl: './color-picker-popover.component.html',
  styleUrls: ['./color-picker-popover.component.scss']
})
export class ColorPickerPopoverComponent implements OnInit {
  @Input() public color = '#f2f2f2';
  public prevColor = this.color;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  public applyColor(): void {
    this.popoverController.dismiss(this.color);
  }
}
