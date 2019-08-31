import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { NgLetDirective } from './directives/ng-let';
import { ActionBuilder } from './store/action-builder';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorPickerPopoverComponent } from './components/color-picker-popover/color-picker-popover.component';
import { StyleDirective } from './directives/style.directive';
import { HslColorPickerComponent } from './components/hsl-color-picker/hsl-color-picker.component';
import { StyleService } from './services/style/style.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuComponent,
    StyleDirective,
    NgLetDirective,
    ColorPickerComponent,
    ColorPickerPopoverComponent,
    HslColorPickerComponent
  ],
  imports: [CommonModule, RouterModule, IonicModule, FormsModule],
  exports: [
    MenuComponent,
    StyleDirective,
    NgLetDirective,
    ColorPickerComponent,
    ColorPickerPopoverComponent,
    HslColorPickerComponent
  ],
  providers: [ActionBuilder, StyleService],
  entryComponents: [ColorPickerPopoverComponent]
})
export class SharedModule {}
