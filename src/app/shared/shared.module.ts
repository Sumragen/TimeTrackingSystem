import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';


@NgModule({
   declarations: [
      MenuComponent
   ],
   imports: [
      CommonModule,
      RouterModule,
      IonicModule
   ],
   exports: [
      MenuComponent
   ]
})
export class SharedModule {
}
