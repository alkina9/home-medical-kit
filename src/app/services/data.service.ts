import {Injectable} from '@angular/core';

export interface Medicine {
  name: string;
  description?: string;
  date_before: string;
  id: number;
  expires: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public medicines: Medicine[] = [
    {
      name: 'Парацетамол',
      description: 'от боли',
      date_before: '10.04.2023',
      id: 0,
      expires: true
    },
    {
      name: 'Аспирин',
      description: 'от головы, для разжижения крови',
      date_before: '13.09.2023',
      id: 1,
      expires: false
    },
    {
      name: 'Афобазол',
      description: 'успокоительное',
      date_before: '12.01.2025',
      id: 2,
      expires: false
    },
  ];

  constructor() {
  }

  public getMedicine(): Medicine[] {
    return this.medicines;
  }

  public getMedicineById(id: number): Medicine {
    return this.medicines[id];
  }
}
