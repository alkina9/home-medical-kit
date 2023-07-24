import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {HomePage} from './home.page';
import {HomePageRoutingModule} from './home-routing.module';
import {FormAddMedicamentsModule} from "../form-add-medicaments/from-add-medicaments.module";
import {MedicineComponentModule} from "../medicine/medicine.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FormAddMedicamentsModule,
    MedicineComponentModule
  ],
  declarations: [HomePage],
  providers: [
    DatePipe,
  ],
})
export class HomePageModule {
}
