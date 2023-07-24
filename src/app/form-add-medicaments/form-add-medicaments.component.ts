import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {DataService, Medicine} from "../services/data.service";
import {AnimationController, ModalController} from "@ionic/angular";
import {NgForm} from '@angular/forms';
import {Subject, takeUntil} from "rxjs";
import {DatePipe} from "@angular/common";

export const enterAnimation = (baseEl: HTMLElement) => {
  const root = baseEl.shadowRoot;
  const animationCtrl = new AnimationController;
  const backdropAnimation = animationCtrl
    .create()
    .addElement(root?.querySelector('ion-backdrop')!)
    .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

  const wrapperAnimation = animationCtrl
    .create()
    .addElement(root?.querySelector('.modal-wrapper')!)
    .keyframes([
      {offset: 0, opacity: '0', transform: 'scale(0)'},
      {offset: 1, opacity: '0.99', transform: 'scale(1)'},
    ]);

  return animationCtrl
    .create()
    .addElement(baseEl)
    .easing('ease-out')
    .duration(500)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

export const leaveAnimation = (baseEl: HTMLElement) => {
  return enterAnimation(baseEl).direction('reverse');
};

@Component({
  selector: 'app-form-add-medicaments',
  templateUrl: './form-add-medicaments.component.html',
  styleUrls: ['./form-add-medicaments.component.scss'],
})

export class FormAddMedicamentsComponent implements OnInit {
  @ViewChild('form') private form!: NgForm;

  private data = inject(DataService);
  private medicines: Medicine[] = [];
  private expires: boolean = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public name: string = '';
  public description: string = '';
  public minDate = '2020-01';
  public maxDate = new Date().getFullYear() + 7;
  public date_before: any = null;

  get today(): string {
    let month: string | number = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    if (month < 10) {
      month = `0${month}`;
    }

    return year + "-" + month;
  }

  get date(): any {
    return this.date_before;
  }

  set date(value: any) {
    value = this.datePipe.transform(value, 'YYYY-MM');
    this.date_before = value;
  }

  constructor(private datePipe: DatePipe, private animationCtrl: AnimationController, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.data.medicamentsChange$.pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.medicines = res;
      });

    if (!this.date_before) {
      this.date_before = this.today;
    }
  }

  cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    if (this.date_before >= this.today) {
      this.expires = false;
    } else this.expires = true;

    const id = Math.random().toString(16).slice(2);

    this.modalCtrl.dismiss({
        date_before: this.date_before,
        description: this.description,
        expires: this.expires,
        id: id,
        name: this.name
      },
      'confirm');
    // this.date_before = this.today;
  }
}
