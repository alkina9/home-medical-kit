import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ViewMedicamentPage} from './view-medicament.page';

import {IonicModule} from '@ionic/angular';

import {ViewMessagePageRoutingModule} from './view-medicament-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMessagePageRoutingModule
  ],
  declarations: [ViewMedicamentPage]
})
export class ViewMedicamentPageModule {
}
