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
  images: string[] = [
    '../assets/1.png',
    '../assets/2.png',
    '../assets/3.png',
  ];
  currentImageIndex = 0;
  imageChangeInterval = 3000; // Time in milliseconds

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
    }, err => {
      console.log(err)
    })
    setInterval(() => {
      this.currentImageIndex++;
      // Reset the index to show the first image after the last one
      if (this.currentImageIndex === this.images.length) {
        this.currentImageIndex = 0;
      }
    }, this.imageChangeInterval);
  }

  addNewGuest() {
    const newGuest = { name: 'Jane Doe', confirmed: false };
    this.dataService.addGuest(newGuest);
  }




}
