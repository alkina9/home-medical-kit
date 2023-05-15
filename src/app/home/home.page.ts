import {Component, inject, ViewChild} from '@angular/core';
import {IonModal, RefresherCustomEvent} from '@ionic/angular';

import {DataService, Medicine} from '../services/data.service';
import {OverlayEventDetail} from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;
  public name: string = '';
  public description: string = '';
  public date_before: string = '';
  private data = inject(DataService);

  constructor() {
  }

  get activeMedicine(): Medicine[] {
    return this.data.getMedicine().filter(medicine => !medicine.expires);
  }

  get expiresDateMedicine(): Medicine[] {
    return this.data.getMedicine().filter(medicine => medicine.expires)
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //push array
      console.log(ev.detail.data);
      this.data.getMedicine().push({date_before: "", description: "", expires: false, id: 0, name: this.name});
    }
  }
}
