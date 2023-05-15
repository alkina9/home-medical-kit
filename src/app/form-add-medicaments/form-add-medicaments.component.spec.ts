import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FormAddMedicamentsComponent} from './form-add-medicaments.component';

describe('FormAddMedicamentsComponent', () => {
  let component: FormAddMedicamentsComponent;
  let fixture: ComponentFixture<FormAddMedicamentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddMedicamentsComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAddMedicamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
