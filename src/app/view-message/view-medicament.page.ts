import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Platform} from '@ionic/angular';
import {DataService, Medicine} from '../services/data.service';

@Component({
  selector: 'app-view-medicine',
  templateUrl: './view-medicament.page.html',
  styleUrls: ['./view-medicament.page.scss'],
})
export class ViewMedicamentPage implements OnInit {
  public medicine!: Medicine;
  public name: string = '';
  public description: string = '';
  public minDate = '2020-01';
  public maxDate = new Date().getFullYear() + 7;

  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.medicine = this.data.getMedicineById(parseInt(id, 10));
  }

  // getBackButtonText() {
  //   const isIos = this.platform.is('ios')
  //   return isIos ? 'Inbox' : '';
  // }
}
