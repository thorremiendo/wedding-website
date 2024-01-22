import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  guests: any[] = [];
  displayedColumns: string[] = ['name', 'plus', 'isConfirmed', 'action'];
  searchKey = new FormControl('');
  isLocked: boolean = true
  code: string = '0000'
  guestName = new FormControl('')

  constructor(private dataStore: DataStoreService, private dataService: DataService) {
    this.searchKey.valueChanges.subscribe(key => {
      this.dataStore.guests$.subscribe(res => {
        console.log(this.guests, 'here')
        this.guests = res.filter(guest => guest?.fullName?.toLowerCase().includes(key?.toLowerCase()))
      })
    })
  }

  ngOnInit(): void {
    this.dataStore.guests$.subscribe(res => {
      this.guests = res
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

  addNewGuest() {
    console.log(this.guestName.value)
    Swal.fire({
      title: 'Confirmation',
      showCancelButton: true,
      text: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        const newGuest = { fullName: this.guestName.value, confirmed: false, withPlus: 0 };
        this.dataService.addGuest(newGuest);
        this.dataService.getGuests().subscribe(res => {
          this.dataStore.setGuests(res)
        }, err => {
          console.log(err)
        })
      } else if (result.isDenied) {
        Swal.fire('Guest not saved', '', 'info')
      }
    })

  }

  deleteGuest(id: string) {
    this.dataService.deleteGuest(id)
  }

  confirmCode() {
    if (this.code == '510825') {
      console.log(this.code)
      this.isLocked = false
    }
  }

}
