import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {Medicine} from '../services/data.service';
import {
  enterAnimation,
  FormAddMedicamentsComponent,
  leaveAnimation
} from "../form-add-medicaments/form-add-medicaments.component";

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicineComponent {
  @Input() medicine?: Medicine;
  private platform = inject(Platform);

  constructor(private modalCtrl: ModalController) {
  }

  isIos(): boolean {
    return this.platform.is('ios')
  }

  async openModal(): Promise<void> {
    const modal = await this.modalCtrl?.create({
      component: FormAddMedicamentsComponent,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      componentProps: {
        name: this.medicine?.name,
        description: this.medicine?.description,
        date_before: this.medicine?.date_before,
        expires: this.medicine?.expires,
      }
    });
    modal?.present();
    const {data, role} = await modal?.onWillDismiss();
  }
}
