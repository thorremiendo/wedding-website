import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) { }

  getGuests(): Observable<any[]> {
    const guestsRef = collection(this.firestore, 'guests');
    return collectionData(guestsRef, { idField: 'id' }) as Observable<any[]>;
  }

  async confirmAttendance(guestId: string, value: boolean) {
    const guestDocRef = doc(this.firestore, `guests/${guestId}`);
    await updateDoc(guestDocRef, { confirmed: value });
  }
}
