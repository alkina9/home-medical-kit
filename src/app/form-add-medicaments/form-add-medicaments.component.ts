import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {OverlayEventDetail} from "@ionic/core/components";
import {DataService, Medicine} from "../services/data.service";
import {IonModal} from "@ionic/angular";
import {NgForm} from '@angular/forms';
import {Subject, takeUntil} from "rxjs";

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
  public date_before: string = '';

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {
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
      let today = new Date().toISOString().slice(0, 10);
      if (this.date_before < today) {
        this.expires = true;
        console.log(this.expires);
      } else this.expires = false;

      console.log(this.date_before >= today);
      const id = Math.random().toString(16).slice(2);
      this.date_before = new Date(this.date_before).toLocaleDateString();
      console.log(this.date_before)
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
}
