import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {AnimationController, IonSearchbar, ModalController, RefresherCustomEvent} from '@ionic/angular';

import {DataService, Medicine} from '../services/data.service';
import {Subject, takeUntil} from "rxjs";
import {
  enterAnimation,
  FormAddMedicamentsComponent,
  leaveAnimation
} from "../form-add-medicaments/form-add-medicaments.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('searchbar', {static: false}) searchbar?: IonSearchbar;

  private data = inject(DataService);
  private medicines: Medicine[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public results: Medicine[] = [];
  public isSearch: boolean = false;

  constructor(private modalCtrl: ModalController, private animationCtrl: AnimationController) {
  }

  get activeMedicine(): Medicine[] {
    return this.medicines.filter(medicine => !medicine.expires);
  }

  get expiresDateMedicine(): Medicine[] {
    return this.medicines.filter(medicine => medicine.expires)
  }

  ngOnInit() {
    this.data.getMedicines().pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.results = res;
        this.medicines = [...this.results]
      });
  }

  refresh(ev: any): void {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async openModal(): Promise<void> {
    const modal = await this.modalCtrl?.create({
      component: FormAddMedicamentsComponent,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
    });
    modal?.present();
    const {data, role} = await modal?.onWillDismiss();

    if (role === 'confirm') {
      await this.addMedicament(data);
      console.log(data);
    }
  }

  async addMedicament(obj: Medicine): Promise<void> {
    await this.data.addMedicament(obj);
  }

  async deleteItem(item: Medicine): Promise<void> {
    await this.data.deleteMedicament(item);
  }

  handleInput(event: any): void {
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
