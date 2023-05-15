import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Medicine} from '../services/data.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicineComponent {
  @Input() medicine?: Medicine;
  private platform = inject(Platform);

  isIos() {
    return this.platform.is('ios')
  }
}
