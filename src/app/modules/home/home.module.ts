import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { IdleComponent } from './idle/idle.component';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild([
         {
            path: '',
            component: HomePage
         }
      ])
   ],
   declarations: [
      HomePage,
      IdleComponent
   ]
})
export class HomePageModule {}
