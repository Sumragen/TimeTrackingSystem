import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DestroyComponent } from './components/destroy/destroy.component';
import { MenuComponent } from './components/menu/menu.component';
import { InnerButtonStylesDirective } from './directives/inner-button-styles.directive';
import { ActionBuilder } from './store/action-builder';

@NgModule({
  declarations: [MenuComponent, InnerButtonStylesDirective],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [MenuComponent, InnerButtonStylesDirective],
  providers: [ActionBuilder]
})
export class SharedModule {}
