import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { DataStoreService } from './data-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  seed: boolean = false
  guests: any[] = [];
  constructor(
    private dataService: DataService,
    private dataStore: DataStoreService
  ) {
  }
  ngOnInit(): void {
    // this.addNewGuest()
    if (this.seed == true) {
      this.dataService.seedGuestsFromJson()
    }
    this.dataService.getGuests().subscribe(res => {
      this.dataStore.setGuests(res)
      // this.dataStore.guests$.subscribe(res => {
      //   console.log('res', res)
      // })
    })
  }

  addNewGuest() {
    const newGuest = { name: 'Jane Doe', confirmed: false };
    this.dataService.addGuest(newGuest);
  }




}
