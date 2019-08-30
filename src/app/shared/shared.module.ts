import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { InnerButtonStylesDirective } from './directives/inner-button-styles.directive';
import { NgLetDirective } from './directives/ng-let';
import { ActionBuilder } from './store/action-builder';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorPickerPopoverComponent } from './components/color-picker-popover/color-picker-popover.component';

@NgModule({
  declarations: [
    MenuComponent,
    InnerButtonStylesDirective,
    NgLetDirective,
    ColorPickerComponent,
    ColorPickerPopoverComponent
  ],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [
    MenuComponent,
    InnerButtonStylesDirective,
    NgLetDirective,
    ColorPickerComponent,
    ColorPickerPopoverComponent
  ],
  providers: [ActionBuilder],
  entryComponents: [ColorPickerComponent]
})
export class SharedModule {}
