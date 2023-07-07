import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {HomePage} from './home.page';
import {HomePageRoutingModule} from './home-routing.module';
import {MedicineComponentModule} from '../medicine/medicine.module';
import {FormAddMedicamentsComponent} from "../form-add-medicaments/form-add-medicaments.component";
import {MaskitoModule} from "@maskito/angular";
import {SimpleMaskModule} from "ngx-ion-simple-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicineComponentModule,
    HomePageRoutingModule,
    MaskitoModule,
    SimpleMaskModule
  ],
  declarations: [HomePage, FormAddMedicamentsComponent],
  providers: [
    DatePipe,
  ],
})
export class HomePageModule {
}
