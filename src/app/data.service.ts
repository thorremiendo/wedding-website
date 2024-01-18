import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, addDoc, query, getDocs, where, updateDoc } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  guestRef
  constructor(private firestore: Firestore,
    private http: HttpClient) {
    this.guestRef = collection(this.firestore, 'guests');
  }

  getGuests(): Observable<any[]> {
    return collectionData(this.guestRef, { idField: 'id' }) as Observable<any[]>;
  }

  // Separate function to add or update a guest
  async addGuest(guestData: any) {
    const guestsRef = collection(this.firestore, 'guests');
    try {
      const docRef = await addDoc(guestsRef, guestData);
      console.log(`New document added with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error; // or handle error as needed
    }
  }

  async updateGuest(guestId: string, confirmedStatus: boolean) {
    const guestDocRef = doc(this.firestore, `guests/${guestId}`);
    try {
      await updateDoc(guestDocRef, { isConfirmed: confirmedStatus });
      console.log(`Guest with ID: ${guestId} has been updated. Confirmed: ${confirmedStatus}`);
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error; // or handle error as needed
    }
  }

  seedGuestsFromJson() {
    this.http.get<any[]>('../assets/data.json').pipe(take(1)).subscribe(async guests => {
      for (const guest of guests) {
        // Check for existing guest with the same fullName
        const q = query(this.guestRef, where('fullName', '==', guest.fullName));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // No existing guest with the same fullName, safe to add
          try {
            const docRef = await addDoc(this.guestRef, guest);
            console.log(`New document added with ID: ${docRef.id}`);
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        } else {
          // Guest with this fullName already exists
          console.log(`Guest with fullName ${guest.fullName} already exists.`);
        }
      }
    }, error => {
      console.error("Error loading guests from JSON: ", error);
    });
  }
}
