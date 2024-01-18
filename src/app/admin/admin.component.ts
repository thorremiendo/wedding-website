import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  guests: any[] = [];
  displayedColumns: string[] = ['name', 'plus', 'isConfirmed', 'action'];
  searchKey = new FormControl('');

  constructor(private dataStore: DataStoreService) {
    this.searchKey.valueChanges.subscribe(key => {
      this.dataStore.guests$.subscribe(res => {
        this.guests = res.filter(guest => guest?.fullName?.includes(key))
      })
    })

  }

  ngOnInit(): void {
    this.dataStore.guests$.subscribe(res => {
      this.guests = res
      console.log(this.guests)
    })
  }

  filterConfirmed() {
    this.guests = this.guests.filter(guest => guest.isConfirmed)
  }

  reset() {
    this.dataStore.guests$.subscribe(res => {
      this.guests = res
    })
  }

  getConfirmedNumber() {
    return this.guests.filter(guest => guest.isConfirmed).length
  }



}
