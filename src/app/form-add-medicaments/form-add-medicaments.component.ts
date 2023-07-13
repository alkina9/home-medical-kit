import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {OverlayEventDetail} from "@ionic/core/components";
import {DataService, Medicine} from "../services/data.service";
import {IonModal} from "@ionic/angular";
import {NgForm} from '@angular/forms';
import {Subject, takeUntil} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-form-add-medicaments',
  templateUrl: './form-add-medicaments.component.html',
  styleUrls: ['./form-add-medicaments.component.scss'],
})
export class FormAddMedicamentsComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  private data = inject(DataService);
  private medicines: Medicine[] = [];
  private expires: boolean = false;

  public name: string = '';
  public description: string = '';
  // public date_before: string = '';

  public minDate = '2020-01';
  public maxDate = new Date().getFullYear() + 7;

  destroy$: Subject<boolean> = new Subject<boolean>();

  public date_before: any;

  get date(): any {
    return this.date_before;
  }

  set date(value: any) {
    console.log(value);
    value = this.datePipe.transform(value, 'YYYY-MM');
    this.date_before = value;
  }

  get today(): string {
    let month: string | number = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    if (month < 10) {
      month = `0${month}`;
    }

    let today = year + "-" + month;
    return today;
  }

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.data.medicamentsChange$.pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.medicines = res;
      });
  }

  onWillDismiss(event: Event, form: NgForm) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //push array
      if (this.date_before < this.today) {
        this.expires = true;
      } else this.expires = false;

      console.log(this.date_before >= this.today);
      const id = Math.random().toString(16).slice(2);
      console.log(this.date_before);
      console.log(this.today);
      this.addMedicament({
        date_before: this.date_before,
        description: this.description,
        expires: this.expires,
        id: id,
        name: this.name
      });
      console.log(this.medicines);
      form.resetForm();
    }
  }

  async addMedicament(obj: Medicine) {
    await this.data.addMedicament(obj);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.data.medicines);
    this.modal.dismiss(this.name, 'confirm');
  }

  pickDateModelChange(dateValue: any): void {
    console.log('ngModel change triggered');
    console.log(dateValue);

    //here you need to add your date format function and service call
  }

  ionChangeEvent(date: string | string[] | null | undefined): void {
    console.log('ion change event triggered');
    console.log(date);
    //here you need to add your date format function and service call
  }
}
