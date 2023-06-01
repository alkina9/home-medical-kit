import {Component, inject, OnInit} from '@angular/core';
import {RefresherCustomEvent} from '@ionic/angular';

import {DataService, Medicine} from '../services/data.service';
import {Subject, takeUntil} from "rxjs";

// import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private data = inject(DataService);
  private medicines: Medicine[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  ngOnInit() {
    this.data.getMedicines().pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.medicines = res;
      });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  get activeMedicine(): Medicine[] {
    return this.medicines.filter(medicine => !medicine.expires);
  }

  get expiresDateMedicine(): Medicine[] {
    return this.medicines.filter(medicine => medicine.expires)
  }

  async deleteItem(item: Medicine) {
    await this.data.deleteMedicament(item);
  }

  //Barcode

  // async checkPermission()  {
  //   try {
  //     // check or request permission
  //     const status = await BarcodeScanner.checkPermission({ force: true });
  //
  //     if (status.granted) {
  //       // the user granted permission
  //       return true;
  //     }
  //     return false;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  startScan() {

  }
}
