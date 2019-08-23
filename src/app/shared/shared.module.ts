import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { InnerButtonStylesDirective } from './directives/inner-button-styles.directive';

@NgModule({
  declarations: [MenuComponent, InnerButtonStylesDirective],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [MenuComponent, InnerButtonStylesDirective]
})
export class SharedModule {}
