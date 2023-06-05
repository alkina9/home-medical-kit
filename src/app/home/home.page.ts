import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RefresherCustomEvent} from '@ionic/angular';

import {DataService, Medicine} from '../services/data.service';
import {Subject, takeUntil} from "rxjs";

import {BarcodeScanner} from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
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

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({force: true});

      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }

      await BarcodeScanner.hideBackground();
      document?.querySelector('body')?.classList?.add('scanner-active');

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      console.log(result);

      if (result?.hasContent) {
        console.log(result.content); // log the raw scanned content
        BarcodeScanner.showBackground();
        document?.querySelector('body')?.classList?.remove('scanner-active');
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document?.querySelector('body')?.classList?.remove('scanner-active');
  };

  ngOnDestroy(): void {
    this.stopScan();
  }
}
