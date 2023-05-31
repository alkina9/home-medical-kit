import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {HomePage} from './home.page';
import {HomePageRoutingModule} from './home-routing.module';
import {MedicineComponentModule} from '../medicine/medicine.module';
import {FormAddMedicamentsComponent} from "../form-add-medicaments/form-add-medicaments.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicineComponentModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FormAddMedicamentsComponent]
})
export class HomePageModule {
}
