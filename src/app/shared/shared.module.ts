import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ColorPickerPopoverComponent } from './components/color-picker-popover/color-picker-popover.component';
import { HslColorPickerComponent } from './components/hsl-color-picker/hsl-color-picker.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotificationService } from './services/notification/notification.service';
import { StyleService } from './services/style/style.service';
import { NgLetDirective } from './directives/ng-let';
import { StyleDirective } from './directives/style.directive';
import { ActionBuilder } from './store/action-builder';
import { PropPipe } from './pipes/prop/prop.pipe';

@NgModule({
  declarations: [
    MenuComponent,
    StyleDirective,
    NgLetDirective,
    ColorPickerPopoverComponent,
    HslColorPickerComponent,
    PropPipe
  ],
  imports: [CommonModule, RouterModule, IonicModule, FormsModule],
  exports: [
    MenuComponent,
    StyleDirective,
    NgLetDirective,
    ColorPickerPopoverComponent,
    HslColorPickerComponent,
    PropPipe
  ],
  providers: [ActionBuilder, StyleService, NotificationService],
  entryComponents: [ColorPickerPopoverComponent]
})
export class SharedModule {}
