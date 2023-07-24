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
        this.medicines = data;
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
