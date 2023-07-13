import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar, RefresherCustomEvent} from '@ionic/angular';

import {DataService, Medicine} from '../services/data.service';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('searchbar', {static: false}) searchbar?: IonSearchbar;

  private data = inject(DataService);
  private medicines: Medicine[] = [];

  public results: Medicine[] = [];
  public isSearch: boolean = false;


  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  ngOnInit() {
    this.data.getMedicines().pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.results = res;
        this.medicines = [...this.results]
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

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.medicines = this.results.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  openSearch(): void {
    this.isSearch = true;
    setTimeout(() => {
      this.searchbar?.setFocus();
    }, 150);
  }

  closeSearch(): void {
    this.isSearch = false;
    this.medicines = [...this.results];
  }

}
