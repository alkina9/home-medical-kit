import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import {Observable, Subject, tap} from "rxjs";

export interface Medicine {
  name: string;
  description?: string;
  date_before: string;
  id: string;
  expires: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  destroy$: Subject<boolean> = new Subject<boolean>();
  medicamentsChange$ = new Subject<any>();

  public medicines: Medicine[] = [];
  // {
  //   name: 'Парацетамол',
  //   description: 'от боли',
  //   date_before: '10.04.2023',
  //   id: '0',
  //   expires: true
  // },
  // {
  //   name: 'Аспирин',
  //   description: 'от головы, для разжижения крови',
  //   date_before: '13.09.2023',
  //   id: '1',
  //   expires: false
  // },
  // {
  //   name: 'Афобазол',
  //   description: 'успокоительное',
  //   date_before: '12.01.2025',
  //   id: '2',
  //   expires: false
  // },


  constructor(private firestore: Firestore) {
  }

  getMedicamentsFromFirestore(): Observable<Medicine[]> {
    const medicamentRef = collection(this.firestore, 'medicines');
    return collectionData(medicamentRef, {idField: 'id'}) as Observable<Medicine[]>;
  }

  getMedicines(): Observable<Medicine[]> {
    return this.getMedicamentsFromFirestore().pipe(
      tap(data => {
        this.medicamentsChange$.next(data);
      })
    );
  }

  addMedicament(medicament: Medicine) {
    const medicamentRef = collection(this.firestore, 'medicines');
    return addDoc(medicamentRef, medicament);
  }

  deleteMedicament(medicament: Medicine) {
    const noteDocRef = doc(this.firestore, `medicines/${medicament.id}`);
    console.log(medicament.id);
    return deleteDoc(noteDocRef);
  }

  public getMedicineById(id: number): Medicine {
    return this.medicines[id];
  }
}
