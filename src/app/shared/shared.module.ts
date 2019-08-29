import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { InnerButtonStylesDirective } from './directives/inner-button-styles.directive';
import { NgLetDirective } from './directives/ng-let';
import { ActionBuilder } from './store/action-builder';

@NgModule({
  declarations: [MenuComponent, InnerButtonStylesDirective, NgLetDirective],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [MenuComponent, InnerButtonStylesDirective, NgLetDirective],
  providers: [ActionBuilder]
})
export class SharedModule {}
