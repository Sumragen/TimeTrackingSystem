import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'app-color-picker-popover',
  templateUrl: './color-picker-popover.component.html',
  styleUrls: ['./color-picker-popover.component.scss'],
})
export class ColorPickerPopoverComponent implements OnInit {
  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}

  public async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ColorPickerComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
