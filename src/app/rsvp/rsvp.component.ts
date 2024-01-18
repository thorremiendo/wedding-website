import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  guests: any[] = [];
  isLoading: boolean = false;
  isConfirmed: any
  currentGuest: any | null = null

  constructor(
    private dataStore: DataStoreService,
    private dataService: DataService
  ) {
    this.filteredOptions = of([]);
  }

  ngOnInit(): void {
    const guestData = localStorage.getItem('guest');
    this.isConfirmed =
      JSON.parse(localStorage.getItem('isConfirmed') ? 'true' : 'false');
    this.currentGuest = guestData ? JSON.parse(guestData) : null;
    console.log(this.isConfirmed, this.currentGuest)
    this.dataStore.guests$.subscribe((res) => {
      this.guests = res;
      console.log(this.guests);
      if (this.guests.length > 0)
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    console.log(value);

    return this.guests.filter((guest) =>
      guest?.fullName?.toLowerCase().includes(filterValue)
    );
  }

  isGuest() {
    return this.guests.find(
      (guest) => guest?.fullName === this.myControl.value
    );
  }

  confirmAttendance() {
    this.isLoading = true;
    const guest = this.guests.find(
      (guest) => guest?.fullName === this.myControl.value
    );
    if (guest) {
      this.dataService
        .updateGuest(guest.id, true)
        .then(() => {
          console.log('Guest confirmed status updated successfully');
          this.isLoading = false;
          this.isConfirmed = true;
          window.localStorage.setItem('isConfirmed', 'true');
          window.localStorage.setItem('guest', JSON.stringify(guest));
          this.ngOnInit()
        })
        .catch((error) => {
          console.error('Error updating guest confirmed status:', error);
        });
    }
  }
}
