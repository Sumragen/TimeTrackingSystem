import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StyleService } from '../../services/style/style.service';

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

  public bgStyle(color: string): string {
    return StyleService.bg(color)
  }

  public applyColor(): void {
    this.popoverController.dismiss(this.color);
  }
}
