import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MedicineComponent} from './medicine.component';
import {FormAddMedicamentsModule} from "../form-add-medicaments/from-add-medicaments.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, FormAddMedicamentsModule],
  declarations: [MedicineComponent],
  exports: [MedicineComponent]
})
export class MedicineComponentModule {
}
