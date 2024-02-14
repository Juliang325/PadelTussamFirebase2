import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrivialPageRoutingModule } from './trivial-routing.module';

import { TrivialPage } from './trivial.page';

@NgModule({
  providers: [DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrivialPageRoutingModule,
    DatePipe
  ],
  declarations: [TrivialPage]
})
export class TrivialPageModule {}
